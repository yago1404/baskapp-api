import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  cep: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  referencePoint: string;

  @OneToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;
}
