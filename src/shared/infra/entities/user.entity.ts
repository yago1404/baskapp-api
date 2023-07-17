import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column()
    height: number;

    @Column()
    weight: number;

    @Column()
    wingspan: number;

    @Column()
    rule: number;

    @Column()
    birthday: Date;
}