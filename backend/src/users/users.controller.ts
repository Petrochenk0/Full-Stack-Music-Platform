import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
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
  @Post('order')
  async addOrder(
    @Request() req,
    @Body('items') items: { name: string; price: number; quantity: number }[],
    @Body('total') total: number,
  ) {
    const username = req.user.username;
    return this.usersService.addOrder(username, items, total);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order-history')
  async getOrderHistory(@Request() req) {
    const username = req.user.username;
    return this.usersService.getOrderHistory(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req) {
    const username = req.user.username;
    return this.usersService.getUserProfile(username);
  }
}
