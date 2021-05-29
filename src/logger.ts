const logger = {
  info(message: string) {
    log('INFO', message)
  }
}

function log(logLevel: string, message: string) {
  const nowStr = new Date(Date.now()).toISOString()
  console.log(`${nowStr} [${logLevel}] ${message}`)
}

export default logger
