class Car {
  constructor(frontRightMotor, frontLeftMotor, backRightMotor, backLeftMotor) {
    this.frontRightMotor = frontRightMotor;
    this.frontLeftMotor = frontLeftMotor;
    this.backRightMotor = backRightMotor;
    this.backLeftMotor = backLeftMotor;
  }

  goStraight() {
    this.frontRightMotor.changeToTopSpeed();
    this.frontLeftMotor.changeToTopSpeed();
    this.backRightMotor.changeToTopSpeed();
    this.backLeftMotor.changeToTopSpeed();
  }

  goRight() {
    this.frontRightMotor.changeToTopSpeed();
    this.frontLeftMotor.changeToMiddleSpeed();
    this.backRightMotor.changeToTopSpeed();
    this.backLeftMotor.changeToMiddleSpeed();
  }

  goLeft() {
    this.frontRightMotor.changeToMiddleSpeed();
    this.frontLeftMotor.changeToTopSpeed();
    this.backRightMotor.changeToMiddleSpeed();
    this.backLeftMotor.changeToTopSpeed();
  }

  stop() {
    this.frontRightMotor.stop();
    this.frontLeftMotor.stop();
    this.backRightMotor.stop();
    this.backLeftMotor.stop();
  }

  cleanUp() {
    this.frontRightMotor.cleanUp();
    this.frontLeftMotor.cleanUp();
    this.backRightMotor.cleanUp();
    this.backLeftMotor.cleanUp();
  }
}

module.exports.Car = Car;
