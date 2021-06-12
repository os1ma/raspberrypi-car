import RaspberryPiCarApplication from './application/raspberryPiCarApplication'
import PWMMotorCarFactory from './infrastructure/rpio/pwmMotorCarFactory'
import logger from './logger'
import KeyboardController from './presentation/keyboard/keyboardController'
import WebSocketController from './presentation/websocket/webSocketController'

const argv = process.argv

console.log(`Starting... argv = ${argv}`)

function initializeController() {
  if (argv.length <= 2) {
    throw new Error(`argv.length is invalid. ${argv.length}`)
  }

  switch (argv[2]) {
    case 'websocket':
      return new WebSocketController()
    case 'keyboard':
      return new KeyboardController()
    default:
      throw new Error(`argv[2] is invalid. argv[2] = ${argv[2]}`)
  }
}

const STOP_SIGNALS = ['SIGTERM', 'SIGINT']

const controller = initializeController()
const carFactory = new PWMMotorCarFactory()

const app = new RaspberryPiCarApplication(controller, carFactory)
app.run()

STOP_SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`)
    app.cleanUp()
  })
})
