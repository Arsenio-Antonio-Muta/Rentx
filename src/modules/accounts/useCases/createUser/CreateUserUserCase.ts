/* eslint-disable prettier/prettier */
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepositories";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({
    name,
    password,
    email,
    drive_licence,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      drive_licence,
    });
  }
}

export { CreateUserUseCase };
