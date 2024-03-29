import Motor from './motor'

export default class Car {
  constructor(
    private frontRightMotor: Motor,
    private frontLeftMotor: Motor,
    private backRightMotor: Motor,
    private backLeftMotor: Motor
  ) {}

  goStraight() {
    this.execAllMotor((motor) => {
      motor.changeToTopSpeed()
    })
  }

  goRight() {
    this.execRightMotor((motor) => {
      motor.stop()
    })
    this.execLeftMotor((motor) => {
      motor.changeToTopSpeed()
    })
  }

  goLeft() {
    this.execRightMotor((motor) => {
      motor.changeToTopSpeed()
    })
    this.execLeftMotor((motor) => {
      motor.stop()
    })
  }

  stop() {
    this.execAllMotor((motor) => {
      motor.stop()
    })
  }

  cleanUp() {
    this.execAllMotor((motor) => {
      motor.cleanUp()
    })
  }

  private execRightMotor(f: (motor: Motor) => void) {
    f(this.frontRightMotor)
    f(this.backRightMotor)
  }

  private execLeftMotor(f: (motor: Motor) => void) {
    f(this.frontLeftMotor)
    f(this.backLeftMotor)
  }

  private execAllMotor(f: (motor: Motor) => void) {
    this.execRightMotor(f)
    this.execLeftMotor(f)
  }
}
