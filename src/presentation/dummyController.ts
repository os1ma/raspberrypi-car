import {
  ControllerCommand,
  ControllerPort
} from '../application/raspberryPiCarApplication'
import logger from '../logger'

export default class DummyController implements ControllerPort {
  enable(send: (command: ControllerCommand) => void) {
    logger.info('DummyController enabled...')
  }
}
