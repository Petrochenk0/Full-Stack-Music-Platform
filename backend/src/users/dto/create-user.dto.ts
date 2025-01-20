import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Имя пользователя обязательно!' })
  username: string;

  @IsEmail({}, { message: 'Некорректный email!' })
  email: string;

  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов!' })
  password: string;

  @IsNotEmpty({ message: 'Повторный пароль обязателен!' })
  confirmPassword: string;
}
