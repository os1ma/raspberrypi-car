const keypress = require("keypress");

const motor = require("./motor");
const Car = require("./car").Car;

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

  keypress(process.stdin);
  process.stdin.on("keypress", (ch, key) => {
    console.log(`[keypress] ch = ${ch}, key = ${key}`);

    if (!key) {
      return;
    }

    // Ctrl + C
    if (key.ctrl && key.name == "c") {
      console.log("Ctrl + C handling...");
      car.cleanUp();
      process.exit();
    }

    switch (key.name) {
      case "up":
        car.goStraight();
        break;
      case "down":
        car.stop();
        break;
      case "right":
        car.goRight();
        break;
      case "left":
        car.goLeft();
        break;
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  STOP_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal} at " + ${new Date()}`);
      car.cleanUp();
    });
  });
}

main();
