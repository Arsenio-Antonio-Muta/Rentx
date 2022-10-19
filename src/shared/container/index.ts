import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepositories";
import { CarsRepository } from "@modules/cars/infra/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
