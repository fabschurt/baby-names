const http = require('http')
const router = require('@src/router')

exports.server = () => (
  http.createServer((request, response) => {
    console.info(`[${request.method}] ${request.url}`)

    let action = router.mapRequestToAction(request)

    if (action) {
      action(request, response)

      return
    }

    response.statusCode = 404
    response.end()
  })
)
