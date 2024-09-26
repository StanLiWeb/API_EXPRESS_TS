import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Curso } from "./cursosModel";

@Entity('maestros')
export class Profesor extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    dni: String;
    @Column()
    nombre: String;
    @Column()
    apellido: String;
    @Column()
    profesion: String;
    @Column()
    telefono: String;
    @Column()
    email: String;

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>Curso,(curso)=> curso.profesor)
    cursos:Curso[]
}