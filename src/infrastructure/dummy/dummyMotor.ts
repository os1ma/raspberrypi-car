import PWMMotor from "../rpio/pwmMotor";

export default class DummyMotor extends PWMMotor {
  constructor() {
    // ダミーとして -1 を代入
    super(-1);
  }
  initializeRpio() {
    // Do nothing
  }
  pwmSetData() {
    // Do nothing
  }
  cleanUp() {
    // Do nothing
  }
}
