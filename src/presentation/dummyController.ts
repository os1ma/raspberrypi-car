import {
  ControllerCommand,
  ControllerPort,
} from "../application/raspberryPiCarApplication";
import logger from "../logger";

export default class DummyController implements ControllerPort {
  enable(onInput: (command: ControllerCommand) => void) {
    logger.info("DummyController enabled...");
  }
}
