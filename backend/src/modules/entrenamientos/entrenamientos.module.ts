import { Module } from '@nestjs/common';
import { EntrenamientosPersistenceModule } from './infrastructure/persistence/entrenamientos-persistence.module';


@Module({
  imports: [EntrenamientosPersistenceModule],
  controllers: [],
  providers: [],
})
export class EntrenamientosModule {}
