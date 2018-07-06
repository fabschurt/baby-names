require('module-alias/register')

var app = require('@src/app.js')

const listeningPort = process.argv[2] || 8080

app.server().listen(listeningPort, (error) => (
  error ? console.error(error) : console.info(`Server is listening on port ${listeningPort}…`)
))
