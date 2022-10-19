import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepositories";

import { User } from "../typeorm/entities/User";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    drive_licence,
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      drive_licence,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
