import { Module } from '@nestjs/common';
import { LesionesPersistenceModule } from './infrastructure/persistence/lesiones-persistence.module';


@Module({
  imports: [LesionesPersistenceModule],
  controllers: [],
  providers: []
})
export class LesionesModule {}
