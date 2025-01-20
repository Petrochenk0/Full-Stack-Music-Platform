import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Тип базы данных
      host: 'localhost', // Адрес сервера базы
      port: 5432, // Порт PostgreSQL
      username: 'postgres', // Твой пользователь БД
      password: '54321', // Пароль от базы
      database: 'clothing_store', // Имя базы
      autoLoadEntities: true, // Автоматически загружать сущности
      synchronize: true, // Синхронизировать схему с БД
    }),
    ConfigModule.forRoot({ isGlobal: true }), // Автозагрузка .env
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
