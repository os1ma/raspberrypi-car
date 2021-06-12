// @ts-ignore
import keypress from 'keypress'
import {
  ControllerCommand,
  ControllerPort
} from '../../application/raspberryPiCarApplication'
import logger from '../../logger'

export default class KeyboardController implements ControllerPort {
  enable(send: (command: ControllerCommand) => void) {
    keypress(process.stdin)

    process.stdin.on('keypress', (ch, key) => {
      logger.info(`[keypress] ch = ${ch}, key = ${JSON.stringify(key)}`)

      if (!key) {
        return
      }

      // Ctrl + C
      if (key.ctrl && key.name == 'c') {
        logger.info('Ctrl + C handling...')
        send(ControllerCommand.CleanUp)
        process.stdin.pause()
      }

      switch (key.name) {
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

    process.stdin.setRawMode(true)
    process.stdin.resume()
  }
}
