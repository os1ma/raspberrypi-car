// https://socket.io/docs/v3/client-installation/index.html
// https://socket.io/get-started/chat

const socket = io()

const buttonIdMessageMapping = {
  up: 'up',
  left: 'left',
  right: 'right',
  stop: 'down'
}

Object.keys(buttonIdMessageMapping).forEach((id) => {
  const message = buttonIdMessageMapping[id]
  const button = document.getElementById(id)

  button.addEventListener('click', () => {
    console.log(`sending message... ${message}`)
    socket.emit('chat message', message)
  })
})
