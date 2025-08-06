import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getOverallStatistics() {
    return this.statisticsService.getOverallStatistics();
  }

  @Get('charts')
  async getChartStatistics() {
    return this.statisticsService.getChartStatistics();
  }
}
