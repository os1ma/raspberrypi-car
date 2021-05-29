import RaspberryPiCarApplication from './application/raspberryPiCarApplication'
import PWMMotorCarFactory from './infrastructure/rpio/pwmMotorCarFactory'
import logger from './logger'
import KeyboardController from './presentation/keyboardController'

const STOP_SIGNALS = ['SIGTERM', 'SIGINT']

const controller = new KeyboardController()
const carFactory = new PWMMotorCarFactory()

const app = new RaspberryPiCarApplication(controller, carFactory)
app.run()

STOP_SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`)
    app.cleanUp()
  })
})
