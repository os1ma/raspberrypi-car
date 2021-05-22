import { KeyboardController } from "./keyboardController";
import logger from "./logger";
import RaspberryPiCarApplication from "./raspberryPiCarApplication";

const STOP_SIGNALS = ["SIGTERM", "SIGINT"];

const controlelr = new KeyboardController();
const app = new RaspberryPiCarApplication(controlelr);
app.run();

STOP_SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`);
    app.cleanUp();
  });
});
