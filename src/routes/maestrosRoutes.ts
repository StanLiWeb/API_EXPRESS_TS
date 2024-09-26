import express from "express";
import maestrosController from "../controllers/maestrosController";
const router = express.Router();

router.get("/", maestrosController.consultar);
router.post("/", maestrosController.ingresar);

router
  .route("/:id")
  .get(maestrosController.consultarDetalle)
  .put(maestrosController.actualizar)
  .delete(maestrosController.borrar);

export default router;
