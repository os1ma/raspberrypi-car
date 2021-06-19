import Led from '../../domain/led'

export default class DummyLed implements Led {
  shine() {
    // Do nothing
  }

  cleanUp() {
    // Do nothing
  }
}
