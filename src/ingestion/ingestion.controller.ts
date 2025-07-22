import { Controller, Post, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  trigger() {
    return this.ingestionService.triggerIngestion();
  }

  @Get('status')
  status() {
    return this.ingestionService.getStatus();
  }
}
