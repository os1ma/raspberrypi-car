import Car from '../domain/car'
import CarFactory from '../domain/carFactory'
import Led from '../domain/led'
import logger from '../logger'

export default class RaspberryPiCarApplication {
  private car: Car

  constructor(
    private controller: ControllerPort,
    carFactory: CarFactory,
    private led: Led
  ) {
    this.car = carFactory.create()
  }

  run() {
    this.controller.enable((command) => {
      switch (command) {
        case ControllerCommand.GoStraight:
          this.car.goStraight()
          break
        case ControllerCommand.Stop:
          this.car.stop()
          break
        case ControllerCommand.GoRight:
          this.car.goRight()
          break
        case ControllerCommand.GoLeft:
          this.car.goLeft()
          break
        case ControllerCommand.CleanUp:
          this.cleanUp()
          break
        default:
          throw new Error(`Unexpected command: ${command}`)
      }
    })
    this.led.shine()
  }

  cleanUp() {
    logger.info('Application cleanUp...')
    this.controller.cleanUp()
    this.car.cleanUp()
    this.led.cleanUp()
  }
}

// このアプリケーションが要求するコントローラの定義

export interface ControllerPort {
  enable(send: (command: ControllerCommand) => void): void
  cleanUp(): void
}

export enum ControllerCommand {
  GoStraight,
  Stop,
  GoRight,
  GoLeft,
  CleanUp
}
