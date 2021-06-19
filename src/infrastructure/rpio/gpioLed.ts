import rpio from 'rpio'
import Led from '../../domain/led'

export default class GpioLed implements Led {
  constructor(private pin: number) {}

  shine() {
    rpio.open(this.pin, rpio.OUTPUT, rpio.HIGH)
  }

  cleanUp() {
    rpio.close(this.pin)
  }
}
