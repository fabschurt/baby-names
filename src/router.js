const routes = require('@config/routes')
const utils = require('@src/utils')
const staticFile = require('@src/action/staticFile')

let convertPathToRegExp = path => (
  new RegExp(`^${utils.escapeForRegExp(path).replace(/\\{\w+\\}/g, '([^/]+)')}$`)
)

let selectValidRoutes = route => (
  typeof route.path === 'string' &&
  typeof route.method === 'string' &&
  typeof route.action === 'function'
)

let deduceMatchingAction = (request) => {
  let match =
    Object.values(routes)
      .filter(selectValidRoutes)
      .filter(route => route.method === request.method)
      .map(route => (
        {
          route,
          pathMatch: request.url.match(convertPathToRegExp(route.path)),
        }
      ))
      .find(route => Array.isArray(route.pathMatch))

  return match
    ? (res, req) => match.route.action(res, req, ...match.pathMatch.slice(1))
    : null
}

exports.mapRequestToAction = (request) => {
  let staticFilePath = utils.getStaticFilePath(request.url)

  return staticFilePath
    ? (req, res) => staticFile(req, res, staticFilePath)
    : deduceMatchingAction(request)
}
