import { Module } from '@nestjs/common';

import { MonitoreoController } from './infraestructure/presentation/monitoreo.controller';

@Module({
  controllers: [MonitoreoController],
  providers: []
})
export class MonitoreoModule {}
