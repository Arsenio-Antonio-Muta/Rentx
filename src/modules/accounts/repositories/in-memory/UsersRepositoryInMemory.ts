import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserRepository } from "../IUsersRepositories";

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    drive_licence,
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      drive_licence,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
