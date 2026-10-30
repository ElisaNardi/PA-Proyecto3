import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LesionesController } from './infrastructure/presentation/lesiones.controller';
import { LesionesService } from './application/lesiones.service';
import { LesionOrmEntity } from './infrastructure/persistence/lesion.orm-entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([LesionOrmEntity]),
  ],
  controllers: [LesionesController],
  providers: [LesionesService]
})
export class LesionesModule {}
