import { Category } from "../entities/Category";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Category;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
