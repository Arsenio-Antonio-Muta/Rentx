import { container } from "tsyringe";

import "@shared/container/providers";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementetion/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
