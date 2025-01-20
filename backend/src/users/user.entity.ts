import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('users') // Указываем имя таблицы
export class User {
  @PrimaryGeneratedColumn() // ID генерируется автоматически
  id: number;

  @Column({ unique: true }) // Логин должен быть уникальным
  username: string;

  @Column({ unique: true, nullable: true, default: '' })
  email: string;

  @Column() // Храним захэшированный пароль
  password: string;

  @OneToMany(() => Order, (order) => order.user) // Связь с заказами
  orders: Order[];
}
