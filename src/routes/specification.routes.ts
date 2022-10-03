import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecifications";

const specificationRouter = Router();

specificationRouter.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRouter };
