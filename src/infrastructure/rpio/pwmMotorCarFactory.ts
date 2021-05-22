import Car from "../../domain/car";
import CarFactory from "../../domain/carFactory";
import PWMMotor from "./pwmMotor";

const PINS = {
  frontRightPin: 12,
  // TODO 以下の 3 つを適切な PIN に変更
  frontLeftPin: 12,
  backRightPin: 12,
  backLeftPin: 12,
};

export default class PWMMotorCarFactory implements CarFactory {
  create() {
    return new Car(
      new PWMMotor(PINS.frontRightPin),
      new PWMMotor(PINS.frontLeftPin),
      new PWMMotor(PINS.backRightPin),
      new PWMMotor(PINS.backLeftPin)
    );
  }
}
