import { Request, Response } from "express";
import { Estudiante } from "../models/estudiantesModel";

class EstudiantesController {

  //CONSULTAR ESTUDIANTE
  async consultar(req: Request, res: Response) {
    try {
      const data = await Estudiante.find();
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //CONSULTA DE DETALLE DE ESTUDIANTE
  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await Estudiante.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error('Estudiante no encontrado')
      }
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //INGRESAR NUEVO ESTUDIANTE
  async ingresar(req: Request, res: Response) {
    try {
      const registro = await Estudiante.save(req.body);
      res.status(201).json(registro)
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //ACTUALIZAR ESTUDIANTE
  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await Estudiante.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error('Estudiante no encontrado')
      }
      await Estudiante.update({ id: Number(id) }, req.body);
      const registroActualizado = await Estudiante.findOneBy({ id: Number(id) });
      res.status(200).send(registroActualizado);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }
  //ELIMINAR ESTUDIANTE
  async borrar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await Estudiante.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error('Estudiante no encontrado')
      }
      await Estudiante.delete({ id: Number(id) });
      res.status(204);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }
}
export default new EstudiantesController();
