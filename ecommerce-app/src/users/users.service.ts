import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }

    async create(email: string, password: string, role: string = 'customer'): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({ email, password: hashedPassword, role });
        return this.usersRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepo.findOne({ where: { email } });
    return user ?? undefined;
}

}
