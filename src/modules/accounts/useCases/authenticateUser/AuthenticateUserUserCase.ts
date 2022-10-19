/* eslint-disable prettier/prettier */
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepositories";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "2aa2374f8e0d52c5330f0b66637e4c7e", {
      subject: user.id,
      expiresIn: "1d",
    });

    const returnToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return returnToken;
  }
}

export { AuthenticateUserUserCase };
