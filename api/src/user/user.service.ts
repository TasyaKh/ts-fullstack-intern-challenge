import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(login: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      login,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    const token = this.authService.generateToken(login);
    return { user: { login }, token };
  }
}
