import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { LoggerService } from 'src/utils/logger/logger.service';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>,    @Inject(REQUEST) private readonly request:any= Request,    private readonly log: LoggerService,

) {}

  async createUser(dto: CreateUserDto): Promise<User> {
          this.log.setLog('info', this.request.req['id'], this.createUser.name, 'createUser', {
        dto,
      });
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.repo.save({ ...dto, password: hashed });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
