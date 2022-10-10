import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUserCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, drive_licence } = request.body;

    const createUserCase = container.resolve(CreateUserUseCase);

    await createUserCase.execute({
      name,
      password,
      email,
      drive_licence,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
