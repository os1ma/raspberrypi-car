import { DummyMotorCarFactory } from "./carFactory";
import { KeyboardController } from "./keyboardController";
import logger from "./logger";
import RaspberryPiCarApplication from "./application/raspberryPiCarApplication";

const controlelr = new KeyboardController();
const carFactory = new DummyMotorCarFactory();

const app = new RaspberryPiCarApplication(controlelr, carFactory);
app.run();

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`);
    app.cleanUp();
  });
});
