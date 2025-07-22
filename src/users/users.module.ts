import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { LoggerService } from 'src/utils/logger/logger.service';
import { DatesService } from 'src/utils/dates/dates.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,LoggerService,DatesService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
