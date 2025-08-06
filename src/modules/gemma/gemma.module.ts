import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GemmaController } from './gemma.controller';
import { GemmaService } from './gemma.service';

@Module({
  imports: [ConfigModule],
  controllers: [GemmaController],
  providers: [GemmaService],
  exports: [GemmaService],
})
export class GemmaModule {}
