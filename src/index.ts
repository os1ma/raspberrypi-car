// @ts-ignore
import keypress from "keypress";
import Car from "./car";
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

function main() {
  const car = new Car(
    new Motor(PINS.frontRightPin),
    new DummyMotor(),
    new DummyMotor(),
    new DummyMotor()
  );

  keypress(process.stdin);
  process.stdin.on("keypress", (ch, key) => {
    logger.info(`[keypress] ch = ${ch}, key = ${JSON.stringify(key)}`);

    if (!key) {
      return;
    }

    // Ctrl + C
    if (key.ctrl && key.name == "c") {
      logger.info("Ctrl + C handling...");
      car.cleanUp();
      process.exit();
    }

    switch (key.name) {
      case "up":
        car.goStraight();
        break;
      case "down":
        car.stop();
        break;
      case "right":
        car.goRight();
        break;
      case "left":
        car.goLeft();
        break;
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  STOP_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      logger.info(`Received ${signal}`);
      car.cleanUp();
    });
  });
}

main();
