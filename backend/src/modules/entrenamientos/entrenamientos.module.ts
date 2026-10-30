import { Module } from '@nestjs/common';

import { EntrenamientosController } from './infrastructure/presentation/controllers/entrenamientos.controller';

@Module({
  imports: [],
  controllers: [EntrenamientosController],
  providers: [],
})
export class EntrenamientosModule {}