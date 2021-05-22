import logger from "../src/logger";

test("ログの形式", () => {
  Date.now = jest.fn(() => 1482363367071);
  console.log = jest.fn();

  logger.info("message");

  expect(console.log).toHaveBeenCalledWith(
    "2016-12-21T23:36:07.071Z [INFO] message"
  );
});
