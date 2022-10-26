import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementetion/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create a rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'description test',
      daily_rate: 100,
      license_plate: "abc-1212",
      fine_amount: 50,
      brand: "brand",
      category_id: "1234"
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    })

    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "123123",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new AppError("There is a rental in progress for user!"))
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new AppError("Car is unaivalable"))

  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayjs().toDate(),
    })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
