import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUserCase } from "./AuthenticateUserUserCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserCase = container.resolve(AuthenticateUserUserCase);

    const token = await authenticateUserCase.execute({ password, email });

    return response.json(token);
  }
}

export { AuthenticateUserController };
