import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationRouter };
