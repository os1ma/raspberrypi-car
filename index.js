const car = require("./src/car");

// 何秒ごとに処理するか
const INTERVAL_SEC = 1;

const PINS = {
  // GPIO 18
  frontRightPin: 12,
  // TODO
  // frontLeftPin: 0,
  // TODO
  // backRightPin: 0,
  // TODO
  // backLeftPin: 0,
};

const STOP_SIGNALS = ["SIGTERM", "SIGINT"];

function main() {
  const motors = Object.values(PINS).map((pin) => {
    return new car.Motor(pin);
  });

  const intervalObject = setInterval(() => {
    motors.forEach((motor) => {
      motor.accelerate();
    });
  }, INTERVAL_SEC * 1000);

  STOP_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal} at " + ${new Date()}`);
      motors.forEach((motor) => {
        motor.close();
      });
      clearInterval(intervalObject);
    });
  });
}

main();
