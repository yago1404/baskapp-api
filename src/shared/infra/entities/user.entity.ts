import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('decimal', { precision: 6, scale: 2 })
  height: number;

  @Column('decimal', { precision: 6, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 6, scale: 2 })
  wingspan: number;

  @Column()
  rule: number;

  @Column()
  birthday: Date;
}
