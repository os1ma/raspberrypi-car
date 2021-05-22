import Car from "./car";

export interface CarFactory {
  create(): Car;
}
