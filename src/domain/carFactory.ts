import Car from "./car";

export default interface CarFactory {
  create(): Car;
}
