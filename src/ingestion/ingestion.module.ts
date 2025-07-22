import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { IngestionLog } from './entities/ingestion-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngestionLog])],
  providers: [IngestionService],
  controllers: [IngestionController],
})
export class IngestionModule {}
