import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // Регистрация
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    console.log('Register request received:', { username, email });
    return this.usersService.register(
      username,
      email,
      password,
      confirmPassword,
    );
  }

  @Post('login') // Логин
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req) {
    const username = req.user.username;
    return this.usersService.getUserProfile(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addToFavorites(@Request() req, @Body() trackData: any) {
    return this.usersService.addToFavorites(req.user.username, trackData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:trackId')
  async removeFromFavorites(@Request() req, @Param('trackId') trackId: string) {
    return this.usersService.removeFromFavorites(req.user.username, trackId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Request() req) {
    return this.usersService.getFavorites(req.user.username);
  }
}
