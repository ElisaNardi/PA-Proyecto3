import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EntrenamientosModule } from './modules/entrenamientos/entrenamientos.module';
import { LesionesModule } from './modules/lesiones/lesiones.module';
import { MonitoreoModule } from './modules/monitoreo/monitoreo.module';
import { EvolucionModule } from './modules/evolucion/evolucion.module';

import databaseConfig from './config/database.config';
import { UnitOfWorkModule } from './shared/infrastructure/unit-of-work/unit-of-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.name'),

        //CAMBIO TEMPORAL, PARA -> Sincronización automática: TypeORM crea o ajusta tablas a partir de las entidades.
        autoLoadEntities: true,
        synchronize:
          process.env.NODE_ENV === 'development' &&
          configService.get<string>('database.name') === 'EVOBOX',
        //DESPUES VA ASI:
        // autoLoadEntities: true,
        // synchronize: false,
        }),
    }),

    UnitOfWorkModule,
    AuthModule,
    UsuariosModule,
    EntrenamientosModule,
    LesionesModule,
    MonitoreoModule,
    EvolucionModule,
  ],
})
export class AppModule {}
