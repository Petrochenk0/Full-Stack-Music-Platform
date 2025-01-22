import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  trackId: string;

  @Column()
  title: string;

  @Column()
  artists: string;

  @Column()
  duration: number;

  @Column()
  src: string;

  @Column()
  preview: string;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
