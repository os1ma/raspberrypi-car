import Car from "./car";
import {
  ControllerCommand,
  ControllerPort,
  KeyboardController,
} from "./keyboardController";
import logger from "./logger";
import { default as Motor, DummyMotor } from "./motor";

const PINS = {
  // GPIO 18
  frontRightPin: 12,
  frontLeftPin: null,
  backRightPin: null,
  backLeftPin: null,
};

const STOP_SIGNALS = ["SIGTERM", "SIGINT"];

class RaspberryPiCarApplication {
  constructor(private controller: ControllerPort) {}

  run() {
    const car = new Car(
      new Motor(PINS.frontRightPin),
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor()
    );

    this.controller.setup((command) => {
      switch (command) {
        case ControllerCommand.GoStraight:
          car.goStraight();
          break;
        case ControllerCommand.Stop:
          car.stop();
          break;
        case ControllerCommand.GoRight:
          car.goRight();
          break;
        case ControllerCommand.GoLeft:
          car.goLeft();
          break;
        case ControllerCommand.CleanUp:
          car.cleanUp();
          process.exit();
        default:
          // TODO ちゃんと実装
          throw new Error();
      }
    });

    STOP_SIGNALS.forEach((signal) => {
      process.on(signal, () => {
        logger.info(`Received ${signal}`);
        car.cleanUp();
      });
    });
  }
}

const controlelr = new KeyboardController();
new RaspberryPiCarApplication(controlelr).run();
