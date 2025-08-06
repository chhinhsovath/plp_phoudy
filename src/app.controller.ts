import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiResponse({ status: 200, description: 'API health check' })
  healthCheck(): { status: string; message: string; timestamp: string } {
    return {
      status: 'ok',
      message: 'PLP Backend API is healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
