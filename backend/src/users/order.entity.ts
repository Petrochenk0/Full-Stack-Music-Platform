import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('orders') // Указываем имя таблицы
export class Order {
  @PrimaryGeneratedColumn() // ID генерируется автоматически
  id: number;

  @ManyToOne(() => User, (user) => user.orders) // Связь с пользователем
  user: User;

  @Column('json') // Храним товары в формате JSON
  items: { name: string; price: number; quantity: number }[];

  @Column('decimal') // Сумма заказа
  total: number;

  @Column() // Дата создания заказа
  createdAt: Date;
}
