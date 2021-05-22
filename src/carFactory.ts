import Car from "./car";
import PWMMotor, { DummyMotor } from "./motor";

const PINS = {
  frontRightPin: 12,
  // TODO 以下の 3 つを適切な PIN に変更
  frontLeftPin: 12,
  backRightPin: 12,
  backLeftPin: 12,
};

export interface CarFactory {
  create(): Car;
}

export class PWMMotorCarFactory implements CarFactory {
  create() {
    return new Car(
      new PWMMotor(PINS.frontRightPin),
      new PWMMotor(PINS.frontLeftPin),
      new PWMMotor(PINS.backRightPin),
      new PWMMotor(PINS.backLeftPin)
    );
  }
}

export class DummyMotorCarFactory implements CarFactory {
  create() {
    return new Car(
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor()
    );
  }
}
