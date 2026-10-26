import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('lesiones')
export class LesionOrmEntity {
  @PrimaryGeneratedColumn()
  idLesion: number;

  @Column({ type: 'integer' })
  boxeadorId: number;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  zona: string;

  @Column({ type: 'varchar', length: 20 })
  gravedad: string;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVA' })
  estado: string;

  @Column({ type: 'date' })
  fecha: string;
}