import Car from "./car";
import { ControllerCommand, ControllerPort } from "./keyboardController";
import { default as Motor, DummyMotor } from "./motor";

const PINS = {
  // GPIO 18
  frontRightPin: 12,
  frontLeftPin: null,
  backRightPin: null,
  backLeftPin: null,
};

export default class RaspberryPiCarApplication {
  private car: Car;

  constructor(private controller: ControllerPort) {
    this.car = new Car(
      new Motor(PINS.frontRightPin),
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor()
    );
  }

  run() {
    this.controller.setup((command) => {
      switch (command) {
        case ControllerCommand.GoStraight:
          this.car.goStraight();
          break;
        case ControllerCommand.Stop:
          this.car.stop();
          break;
        case ControllerCommand.GoRight:
          this.car.goRight();
          break;
        case ControllerCommand.GoLeft:
          this.car.goLeft();
          break;
        case ControllerCommand.CleanUp:
          this.car.cleanUp();
          process.exit();
        default:
          // TODO ちゃんと実装
          throw new Error();
      }
    });
  }

  cleanUp() {
    this.car.cleanUp();
  }
}
