import { Module } from '@nestjs/common';
import { MonitoreoController } from './infraestructure/presentation/monitoreo.controller';
import { MonitoreoService } from './application/monitoreo.service';

@Module({
  controllers: [MonitoreoController],
  providers: [MonitoreoService]
})
export class MonitoreoModule {}
