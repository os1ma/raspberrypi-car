// @ts-ignore
import keypress from "keypress";
import {
  ControllerCommand,
  ControllerPort,
} from "../application/raspberryPiCarApplication";
import logger from "../logger";

export class KeyboardController implements ControllerPort {
  enable(onInput: (command: ControllerCommand) => void) {
    keypress(process.stdin);

    process.stdin.on("keypress", (ch, key) => {
      logger.info(`[keypress] ch = ${ch}, key = ${JSON.stringify(key)}`);

      if (!key) {
        return;
      }

      // Ctrl + C
      if (key.ctrl && key.name == "c") {
        logger.info("Ctrl + C handling...");
        onInput(ControllerCommand.CleanUp);
      }

      switch (key.name) {
        case "up":
          onInput(ControllerCommand.GoStraight);
          break;
        case "down":
          onInput(ControllerCommand.Stop);
          break;
        case "right":
          onInput(ControllerCommand.GoRight);
          break;
        case "left":
          onInput(ControllerCommand.GoLeft);
          break;
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}
