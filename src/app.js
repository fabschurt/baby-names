let http = require('http')
let router = require('./router')

const listeningPort = process.argv[2] ? process.argv[2] : 8080

let server = http.createServer((request, response) => {
  console.log(request.url)

  let action = router.mapRequestToAction(request)

  if (!action) {
    response.statusCode = 404

    return response.end()
  }

  response.end(action(request))
})

server.listen(listeningPort, (error) => {
  if (error) {
    return console.error(error)
  }

  console.log(`Server is listening on ${listeningPort}…`)
})
