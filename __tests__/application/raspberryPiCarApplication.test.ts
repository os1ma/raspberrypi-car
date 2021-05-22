import DummyMotorCarFactory from "./../../src//infrastructure/dummy/dummyMotorCarFactory";
import RaspberryPiCarApplication from "./../../src/application/raspberryPiCarApplication";
import DummyController from "./../../src/presentation/dummyController";

test("ダミーアプリケーションの起動", () => {
  const controller = new DummyController();
  const carFactory = new DummyMotorCarFactory();

  const app = new RaspberryPiCarApplication(controller, carFactory);
  app.run();
  app.cleanUp();
});
