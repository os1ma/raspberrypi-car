const rpio = require("rpio");

// 最大のパルス幅
const MAX_PULSE_RANGE = 128;

// 加速のステップ数
const ACCELERATION_STOP_COUNT = 4;

// 周波数。8 は 2.4 MHz
const CLOCK_DIVIDER = 8;

class Motor {
  constructor(pin) {
    this.pin = pin;
    this.pwmValue = 0;

    rpio.open(pin, rpio.PWM);
    rpio.pwmSetClockDivider(CLOCK_DIVIDER);
    rpio.pwmSetRange(pin, MAX_PULSE_RANGE);
  }

  accelerate() {
    if (this.pwmValue < MAX_PULSE_RANGE) {
      this.pwmValue += MAX_PULSE_RANGE / ACCELERATION_STOP_COUNT;
    }
    console.log(`PIN[${this.pin}] pwmValue = ${this.pwmValue}`);
    rpio.pwmSetData(this.pin, this.pwmValue);
  }

  close() {
    rpio.close(this.pin);
  }
}

module.exports.Motor = Motor;
