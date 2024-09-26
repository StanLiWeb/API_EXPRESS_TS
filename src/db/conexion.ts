import { DataSource } from "typeorm";
import { Estudiante } from "../models/estudiantesModel";
import { Profesor } from "../models/maestrosModel";
import { Curso } from "../models/cursosModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "cursosts",
    synchronize: true,
    logging: true,
    entities: [Estudiante, Profesor, Curso],
})