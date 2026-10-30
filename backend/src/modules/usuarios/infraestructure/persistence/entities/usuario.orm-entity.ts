import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "../../../domain/enums/rol.enum";

@Entity('usuarios')
export class UsuarioOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    nombre!: string;
    
    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    passwordHash!: string;

    @Column({ type: 'enum', enum: Rol })
    rol!: Rol;
}
