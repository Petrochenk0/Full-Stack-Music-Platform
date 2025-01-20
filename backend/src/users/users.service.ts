import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Order } from './order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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

  async addOrder(
    username: string,
    items: { name: string; price: number; quantity: number }[],
    total: number,
  ): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const order = this.orderRepository.create({
      user,
      items,
      total,
      createdAt: new Date(),
    });
    await this.orderRepository.save(order);
    return order;
  }

  // Метод для получения истории заказов
  async getOrderHistory(username: string): Promise<Order[]> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['orders'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.orders;
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
}
