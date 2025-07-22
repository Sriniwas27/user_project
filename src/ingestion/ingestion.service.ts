import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngestionLog } from './entities/ingestion-log.entity';

@Injectable()
export class IngestionService {
  constructor(@InjectRepository(IngestionLog) private repo: Repository<IngestionLog>) {}

  async triggerIngestion() {
    const log = this.repo.create({ status: 'running' });
    await this.repo.save(log);

    setTimeout(async () => {
      log.status = 'completed';
      await this.repo.save(log);
    }, 5000);

    return { message: 'Ingestion started', logId: log.id };
  }

  async getStatus() {
    return this.repo.find({ order: { triggeredAt: 'DESC' }, take: 5 });
  }
}
