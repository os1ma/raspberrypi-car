const logger = {
  info(message: string) {
    log("INFO", message);
  },
};

function log(logLevel: string, message: string) {
  const now = new Date();
  console.log(`${now} [${logLevel}] ${message}`);
}

export default logger;
