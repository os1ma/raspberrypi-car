import express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {
  ControllerCommand,
  ControllerPort
} from '../../application/raspberryPiCarApplication'
import logger from '../../logger'

const PORT = 3000
const STATIC_DIR = 'src/presentation/websocket/static'

export default class WebSocketController implements ControllerPort {
  private server?: http.Server
  private io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>

  enable(send: (command: ControllerCommand) => void) {
    const app = express()
    const preparingServer = http.createServer(app)
    this.io = new Server(preparingServer)

    app.use(express.static(STATIC_DIR))

    this.io.on('connection', (socket) => {
      console.log('a user connected')

      socket.on('chat message', (message) => {
        switch (message) {
          case 'up':
            send(ControllerCommand.GoStraight)
            break
          case 'down':
            send(ControllerCommand.Stop)
            break
          case 'right':
            send(ControllerCommand.GoRight)
            break
          case 'left':
            send(ControllerCommand.GoLeft)
            break
        }
      })
    })

    this.server = preparingServer.listen(PORT, () => {
      console.log(`WebSocketController listening at http://*:${PORT}`)
    })
  }

  cleanUp() {
    logger.info('WebSocketController cleanUp...')
    this.io?.close(() => {
      logger.info('io closed.')
    })
    this.server?.close(() => {
      logger.info('server closed.')
    })
  }
}
