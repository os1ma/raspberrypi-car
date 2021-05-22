import RaspberryPiCarApplication from "./application/raspberryPiCarApplication";
import DummyMotorCarFactory from "./infrastructure/dummy/dummyMotorCarFactory";
import logger from "./logger";
import KeyboardController from "./presentation/keyboardController";

const controller = new KeyboardController();
const carFactory = new DummyMotorCarFactory();

const app = new RaspberryPiCarApplication(controller, carFactory);
app.run();

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`);
    app.cleanUp();
  });
});
