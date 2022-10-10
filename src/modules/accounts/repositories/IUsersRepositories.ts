import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
