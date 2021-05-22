import Car from "./car";
import { CarFactory } from "./carFactory";
import { ControllerCommand, ControllerPort } from "./keyboardController";

export default class RaspberryPiCarApplication {
  private car: Car;

  constructor(private controller: ControllerPort, carFactory: CarFactory) {
    this.car = carFactory.create();
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
