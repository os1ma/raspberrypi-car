import DummyMotorCarFactory from "./../../src//infrastructure/dummy/dummyMotorCarFactory";
import RaspberryPiCarApplication from "./../../src/application/raspberryPiCarApplication";
import DummyController from "./../../src/presentation/dummyController";

test("ダミーアプリケーションの起動", () => {
  const controlelr = new DummyController();
  const carFactory = new DummyMotorCarFactory();

  const app = new RaspberryPiCarApplication(controlelr, carFactory);
  app.run();
  app.cleanUp();
});
