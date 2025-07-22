import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Document } from './documents/entities/document.entity';
import { DocumentsModule } from './documents/documents.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { IngestionLog } from './ingestion/entities/ingestion-log.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { LoggerModule } from './utils/logger/logger.module';


@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER || 'user',
  password: process.env.DATABASE_PASSWORD || 'pass',
  database: process.env.DATABASE_NAME || 'nestdb',
  entities: [User, Document, IngestionLog],
  synchronize: true,
}),

    AuthModule,
    UsersModule,
    DocumentsModule,
    IngestionModule,
    LoggerModule
  ],

providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
]



})
export class AppModule {}
