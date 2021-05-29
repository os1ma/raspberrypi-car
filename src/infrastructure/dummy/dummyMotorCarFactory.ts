import Car from '../../domain/car'
import CarFactory from '../../domain/carFactory'
import DummyMotor from './dummyMotor'

export default class DummyMotorCarFactory implements CarFactory {
  create() {
    return new Car(
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor(),
      new DummyMotor()
    )
  }
}
