import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { login: string; password: string },
    @Res() res: Response,
  ) {
    if (!body.login || !body.password) {
      throw new HttpException('Invalid input', HttpStatus.METHOD_NOT_ALLOWED);
    }
    const result = await this.usersService.createUser(
      body.login,
      body.password,
    );
    return res.status(201).json(result);
  }
}
