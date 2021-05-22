import Motor from "../../domain/motor";
import logger from "../../logger";

// 最大のパルス幅
const MAX_SPEED_VALUE = 128;
const MIDDLE_SPEED_VALUE = 96;
const STOP_SPEED_VALUE = 0;

// 周波数。8 は 2.4 MHz
const CLOCK_DIVIDER = 8;

export default class PWMMotor implements Motor {
  protected pwmValue: number;

  constructor(protected pin: number) {
    this.pwmValue = STOP_SPEED_VALUE;

    logger.info(`PIN[${this.pin}] initializing...`);
    this.initializeRpio();
  }

  changeToTopSpeed() {
    this.changeSpeed(MAX_SPEED_VALUE);
  }

  changeToMiddleSpeed() {
    this.changeSpeed(MIDDLE_SPEED_VALUE);
  }

  stop() {
    this.changeSpeed(STOP_SPEED_VALUE);
  }

  cleanUp() {
    this.stop();
    rpio.close(this.pin);
  }

  protected initializeRpio() {
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(CLOCK_DIVIDER);
    rpio.pwmSetRange(this.pin, MAX_SPEED_VALUE);
  }

  protected pwmSetData() {
    rpio.pwmSetData(this.pin, this.pwmValue);
  }

  private changeSpeed(pwdValue: number) {
    this.pwmValue = pwdValue;
    logger.info(`PIN[${this.pin}] pwmValue = ${this.pwmValue}`);
    this.pwmSetData();
  }
}
