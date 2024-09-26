import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import estudiantesRoutes from "./routes/estudiantesRoutes";
import maestrosRoutes from "./routes/maestrosRoutes";
import cursosRoutes from "./routes/cursosRoutes";


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
    console.log('ola mundo')
    res.send('ola mundo')
})

app.use("/estudiantes", estudiantesRoutes);
app.use("/maestros", maestrosRoutes);
app.use("/cursos", cursosRoutes);



export default app;