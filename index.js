const rpio = require("rpio");

// GPIO 18
const PIN = 12;

// 最大のパルス幅
const MAX_PULSE_RANGE = 128;
// 加速のステップ数
const ACCELERATION_STOP_COUNT = 8;
// 周波数。8 は 2.4 MHz
const CLOCK_DIVIDER = 8;
// 何秒ごとに処理するか
const INTERVAL_SEC = 1;

rpio.open(PIN, rpio.PWM);
rpio.pwmSetClockDivider(CLOCK_DIVIDER);
rpio.pwmSetRange(PIN, MAX_PULSE_RANGE);

pwmValue = 0;

const intervalObject = setInterval(() => {
  if (pwmValue < MAX_PULSE_RANGE) {
    pwmValue += MAX_PULSE_RANGE / ACCELERATION_STOP_COUNT;
  }
  console.log(`PIN[${PIN}] pwmValue = ${pwmValue}`);
  rpio.pwmSetData(PIN, pwmValue);
}, INTERVAL_SEC * 1000);

const STOP_SIGNALS = ["SIGTERM", "SIGINT"];

STOP_SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal} at " + ${new Date()}`);
    rpio.close(PIN);
    clearInterval(intervalObject);
  });
});
