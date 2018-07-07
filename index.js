require('module-alias/register')

const app = require('@src/app.js')

const LISTENING_PORT = process.argv[2] || 8080

app.server().listen(LISTENING_PORT, (error) => (
  error ? console.error(error) : console.info(`Server is listening on port ${LISTENING_PORT}…`)
))
