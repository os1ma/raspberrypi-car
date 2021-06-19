import DummyMotorCarFactory from './../../src//infrastructure/dummy/dummyMotorCarFactory'
import RaspberryPiCarApplication from './../../src/application/raspberryPiCarApplication'
import DummyController from './../../src/presentation/dummy/dummyController'
import DummyLed from './../../src/infrastructure/dummy/dummyLed'

test('ダミーアプリケーションの起動', () => {
  const controller = new DummyController()
  const carFactory = new DummyMotorCarFactory()
  const led = new DummyLed()

  const app = new RaspberryPiCarApplication(controller, carFactory, led)
  app.run()
  app.cleanUp()
})
