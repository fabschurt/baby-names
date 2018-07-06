var fs = require('fs')
var utils = require('@src/utils')

const docRoot = `${__dirname}/../public`

var convertPathToRouteRegex = (path) => (
  new RegExp(`^${utils.escapeForRegExp(path).replace(/\\{\w+\\}/g, '([^/]+)')}$`)
)

exports.tryStaticFile = (request) => {
  var filePath = docRoot + request.url

  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? fs.readFileSync(filePath)
    : null
}

exports.mapRequestToAction = (request) => {
  var routes = require('@config/routes')

  for (routeKey in routes) {
    var route = routes[routeKey]

    if (
      typeof route.path !== 'string' ||
      typeof route.method !== 'string' ||
      typeof route.action.exec !== 'function'
    ) {
      continue
    }

    var routeMatching = request.url.match(convertPathToRouteRegex(route.path))

    if (!routeMatching || request.method !== route.method) {
      continue
    }

    return (request) => route.action.exec(request, ...routeMatching.slice(1))
  }

  return null
}
