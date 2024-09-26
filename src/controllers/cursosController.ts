import { Request, Response } from "express";
import { Curso } from "../models/cursosModel";
import { Profesor } from "../models/maestrosModel";
import { Estudiante } from "../models/estudiantesModel";

class CursosController {

  //CONSULTAR CURSOS
  async consultar(req: Request, res: Response) {
    try {
      const data = await Curso.find({ relations: { profesor: true, estudiantes: true } });
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //CONSULTA DE DETALLE DE CURSOS
  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await Curso.findOne({ where: { id: Number(id) }, relations: { profesor: true, estudiantes: true } });
      if (!registro) {
        throw new Error('Curso no encontrado')
      }
      res.status(200).json(registro);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //INGRESAR NUEVO CURSOS
  async ingresar(req: Request, res: Response) {
    try {
      const { profesor } = req.body
      const profesorRegistro = await Profesor.findOneBy({ id: Number(profesor) });
      if (!profesorRegistro) {
        throw new Error('Profesor no encontrado')
      }
      const registro = await Curso.save(req.body);
      res.status(201).json(registro)
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //ACTUALIZAR CURSOS
  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { profesor } = req.body
      const profesorRegistro = await Profesor.findOneBy({ id: Number(profesor) });
      if (!profesorRegistro) {
        throw new Error('Profesor no encontrado')
      }
      const registro = await Curso.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error('Curso no encontrado')
      }
      await Curso.update({ id: Number(id) }, req.body);
      const registroActualizado = await Curso.findOne({ where: { id: Number(id) }, relations: { profesor: true, estudiantes: true } });
      res.status(200).send(registroActualizado);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }
  //ELIMINAR CURSOS
  async borrar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await Curso.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error('Curso no encontrado')
      }
      await Curso.delete({ id: Number(id) });
      res.status(200);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  async asociarEstudiante(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { estudiante_id, curso_id } = req.body
      const estudiante = await Estudiante.findOneBy({ id: Number(estudiante_id) })
      const curso = await Curso.findOneBy({ id: Number(curso_id) })
      if (!estudiante) {
        throw new Error('Curso no encontrado')
      }
      if (!curso) {
        throw new Error('Curso no encontrado')
      }
      curso.estudiantes = curso.estudiantes || [];
      curso.estudiantes.push(estudiante);

      const registro = await Curso.save(curso)
      res.status(200).json(registro);

    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }
}
export default new CursosController();
