import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LesionesController } from './infrastructure/presentation/controllers/lesiones.controller';

@Module({
   imports: [],
  controllers: [LesionesController],
  providers: []
})
export class LesionesModule {}
