import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Favorite } from './favorite.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly jwtService: JwtService,
  ) {}

  // Регистрация
  async register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ username: string; accessToken: string }> {
    if (!username || !email || !password || password !== confirmPassword) {
      throw new Error('Invalid input or passwords do not match!');
    }

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error('Username already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    const accessToken = await this.generateToken(user.username);
    return { username: user.username, accessToken };
  }

  // Логин
  async login(
    username: string,
    password: string,
  ): Promise<{ username: string; accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const accessToken = await this.generateToken(user.username);
    return { username: user.username, accessToken };
  }

  private generateToken(username: string): Promise<string> {
    const payload = { username };
    return this.jwtService.signAsync(payload);
  }

  async getUserProfile(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      username: user.username,
      email: user.email,
    };
  }

  async addToFavorites(username: string, trackData: any) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: { user: { id: user.id }, trackId: trackData.id.toString() },
    });

    if (existingFavorite) {
      throw new Error('Track already in favorites');
    }

    const favorite = this.favoriteRepository.create({
      trackId: trackData.id.toString(),
      title: trackData.title,
      artists: trackData.artists,
      duration: trackData.duration,
      src: trackData.src,
      preview: trackData.preview,
      user,
    });

    await this.favoriteRepository.save(favorite);
    return favorite;
  }

  async removeFromFavorites(username: string, trackId: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const favorite = await this.favoriteRepository.findOne({
      where: { user: { id: user.id }, trackId: trackId.toString() },
    });

    if (!favorite) {
      throw new Error('Track not found in favorites');
    }

    await this.favoriteRepository.remove(favorite);
    return { message: 'Track removed from favorites' };
  }

  async getFavorites(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['favorites'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.favorites;
  }
}
