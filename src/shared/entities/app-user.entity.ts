import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AppUsers')
export class AppUserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public refreshToken: string;

  @Column({ default: 'common' })
  public role: string;

  @Column({ default: 'player' })
  public type: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public birthday: Date;

  @Column({ nullable: true })
  public height: number;

  @Column({ nullable: true })
  public weight: number;

  @Column({ nullable: true })
  public wingspan: number;

  @Column({ nullable: true })
  public stats: string;

  @Column({ nullable: true })
  public teams: string;
}
