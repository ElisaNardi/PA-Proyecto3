import { Module } from '@nestjs/common';
import { MonitoreoPersistenceModule } from './infrastructure/persistence/monitoreo-persistence.module';


@Module({
  imports: [MonitoreoPersistenceModule],
  controllers: [],
  providers: []
})
export class MonitoreoModule {}
