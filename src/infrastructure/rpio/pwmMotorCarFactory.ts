import Car from '../../domain/car'
import CarFactory from '../../domain/carFactory'
import PWMMotor from './pwmMotor'

const PINS = {
  rightPin: 12,
  leftPin: 33
}

export default class PWMMotorCarFactory implements CarFactory {
  create() {
    const rightMotor = new PWMMotor(PINS.rightPin)
    const leftMotor = new PWMMotor(PINS.leftPin)

    return new Car(rightMotor, leftMotor, rightMotor, leftMotor)
  }
}
