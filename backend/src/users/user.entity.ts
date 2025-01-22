import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from './favorite.entity';

@Entity('users') // Указываем имя таблицы
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true, default: '' })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
