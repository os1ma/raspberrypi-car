const motor = require("./src/motor");
const Car = require("./src/car").Car;

// 何秒ごとに処理するか
const INTERVAL_SEC = 1;

const PINS = {
  // GPIO 18
  frontRightPin: 12,
  frontLeftPin: null,
  backRightPin: null,
  backLeftPin: null,
};

const STOP_SIGNALS = ["SIGTERM", "SIGINT"];

function main() {
  const car = new Car(
    new motor.Motor(PINS.frontRightPin),
    new motor.DummyMotor(PINS.frontLeftPin),
    new motor.DummyMotor(PINS.backRightPin),
    new motor.DummyMotor(PINS.backLeftPin)
  );

  const intervalObject = setInterval(() => {
    car.goStraight();
  }, INTERVAL_SEC * 1000);

  STOP_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal} at " + ${new Date()}`);

      clearInterval(intervalObject);

      car.cleanUp();
    });
  });
}

main();
