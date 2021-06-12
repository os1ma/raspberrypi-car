import RaspberryPiCarApplication from './application/raspberryPiCarApplication'
import PWMMotorCarFactory from './infrastructure/rpio/pwmMotorCarFactory'
import logger from './logger'
import WebSocketController from './presentation/websocket/webSocketController'

// TODO keyboardCarApplication.ts と異なる箇所以外を共通化する

const STOP_SIGNALS = ['SIGTERM', 'SIGINT']

const controller = new WebSocketController()
const carFactory = new PWMMotorCarFactory()

const app = new RaspberryPiCarApplication(controller, carFactory)
app.run()

STOP_SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}`)
    app.cleanUp()
  })
})
