import PWMMotor from "./motor";

export default class Car {
  constructor(
    private frontRightMotor: PWMMotor,
    private frontLeftMotor: PWMMotor,
    private backRightMotor: PWMMotor,
    private backLeftMotor: PWMMotor
  ) {}

  goStraight() {
    this.execAllMotor((motor) => {
      motor.changeToTopSpeed();
    });
  }

  goRight() {
    this.execRightMotor((motor) => {
      motor.changeToTopSpeed();
    });
    this.execLeftMotor((motor) => {
      motor.changeToMiddleSpeed();
    });
  }

  goLeft() {
    this.execRightMotor((motor) => {
      motor.changeToMiddleSpeed();
    });
    this.execLeftMotor((motor) => {
      motor.changeToTopSpeed();
    });
  }

  stop() {
    this.execAllMotor((motor) => {
      motor.stop();
    });
  }

  cleanUp() {
    this.execAllMotor((motor) => {
      motor.cleanUp();
    });
  }

  private execRightMotor(f: (motor: PWMMotor) => void) {
    f(this.frontRightMotor);
    f(this.backRightMotor);
  }

  private execLeftMotor(f: (motor: PWMMotor) => void) {
    f(this.frontLeftMotor);
    f(this.backLeftMotor);
  }

  private execAllMotor(f: (motor: PWMMotor) => void) {
    this.execRightMotor(f);
    this.execLeftMotor(f);
  }
}
