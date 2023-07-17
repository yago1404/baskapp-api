import { Injectable } from '@nestjs/common';

const  users : {email: string, password: string}[] = [ {email: 'ytaveiros@gmail.com', 'password': '123456'} ];

@Injectable()
export class UsersService {
    async authenticate(email: string, password: string) {
        let user = users.find(value => value.email === email && value.password === password);
        return user !== undefined;
    }
}
