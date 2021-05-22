import rpio from "rpio";
import logger from "./logger";

// 最大のパルス幅
const MAX_SPEED_VALUE = 128;
const MIDDLE_SPEED_VALUE = 96;
const STOP_SPEED_VALUE = 0;

// 加速のステップ数
const ACCELERATION_STOP_COUNT = 4;

// 周波数。8 は 2.4 MHz
const CLOCK_DIVIDER = 8;

export default class PWMMotor {
  protected pwmValue: number;

  constructor(protected pin: number) {
    this.pwmValue = 0;

    this.initialize();
  }

  initialize() {
    logger.info(`PIN[${this.pin}] initializing...`);
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(CLOCK_DIVIDER);
    rpio.pwmSetRange(this.pin, MAX_SPEED_VALUE);
  }

  accelerate() {
    if (this.pwmValue >= MAX_SPEED_VALUE) {
      return;
    }

    const pwmValue = this.pwmValue + MAX_SPEED_VALUE / ACCELERATION_STOP_COUNT;
    this.changeSpeed(pwmValue);
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

  changeSpeed(pwdValue: number) {
    this.pwmValue = pwdValue;
    logger.info(`PIN[${this.pin}] pwmValue = ${this.pwmValue}`);
    rpio.pwmSetData(this.pin, this.pwmValue);
  }

  cleanUp() {
    this.stop();
    rpio.close(this.pin);
  }
}

export class DummyMotor extends PWMMotor {
  constructor() {
    // ダミーとして 0 を代入
    super(0);
  }
  initialize() {
    // Do nothing
  }
  changeSpeed(pwdValue: number) {
    this.pwmValue = pwdValue;
    logger.info(`PIN[DUMMY] pwmValue = ${this.pwmValue}`);
  }
  cleanUp() {
    // Do nothing
  }
}
