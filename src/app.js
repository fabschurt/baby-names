var http = require('http')
var router = require('@src/router')

exports.server = () => (
  http.createServer((request, response) => {
    console.info(`[${request.method}] ${request.url}`)

    var staticFileContent = router.tryStaticFile(request)

    if (staticFileContent) {
      return response.end(staticFileContent)
    }

    var action = router.mapRequestToAction(request)

    if (action) {
      response.end(action(request))
    }

    response.statusCode = 404

    return response.end()
  })
)
