const rpio = require("rpio");

// 最大のパルス幅
const MAX_SPEED_VALUE = 128;
const MIDDLE_SPEED_VALUE = 96;
const STOP_SPEED_VALUE = 0;

// 加速のステップ数
const ACCELERATION_STOP_COUNT = 4;

// 周波数。8 は 2.4 MHz
const CLOCK_DIVIDER = 8;

class Motor {
  constructor(pin) {
    this.pin = pin;
    this.pwmValue = 0;

    this.initialize();
  }

  initialize() {
    console.log(`PIN[${this.pin}] initializing...`);
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(CLOCK_DIVIDER);
    rpio.pwmSetRange(this.pin, MAX_SPEED_VALUE);
  }

  accelerate() {
    if (this.pwmValue < MAX_SPEED_VALUE) {
      pwmValue = this.pwmValue + MAX_SPEED_VALUE / ACCELERATION_STOP_COUNT;
    }
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

  changeSpeed(pwdValue) {
    this.pwmValue = pwdValue;
    console.log(`PIN[${this.pin}] pwmValue = ${this.pwmValue}`);
    rpio.pwmSetData(this.pin, this.pwmValue);
  }

  cleanUp() {
    this.stop();
    rpio.close(this.pin);
  }
}

class DummyMotor extends Motor {
  initialize() {
    // Do nothing
  }
  changeSpeed(pwdValue) {
    this.pwmValue = pwdValue;
    console.log(`PIN[${this.pin}] pwmValue = ${this.pwmValue}`);
  }
  cleanUp() {
    // Do nothing
  }
}

module.exports.Motor = Motor;
module.exports.DummyMotor = DummyMotor;
