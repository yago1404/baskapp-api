import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  height: number;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  weight: number;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  wingspan: number;

  @Column()
  rule: number;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  lastRefreshToken: string;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;
}
