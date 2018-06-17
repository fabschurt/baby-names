let config = require('./config')
let utils = require('./utils')

const actionDir = './action'

let mapRequestToRoute = (request) => {
  routes = config.loadFromYaml('routing.yml')

  if (!routes) {
    return null
  }

  for (routeKey in routes) {
    route = routes[routeKey]

    if (typeof route.path !== 'string' || typeof route.method !== 'string') {
      continue
    }

    let pathRegex = `^${utils.escapeForRegExp(route.path).replace(/\\{\w+\\}/g, '(.+)')}$`
    let routeMatching = request.url.match(new RegExp(pathRegex))

    if (!routeMatching || !request.method === route.method) {
      continue
    }

    return {
      action: route.action,
      args: routeMatching.slice(1),
    }
  }

  return null
}

let mapRouteToAction = (route) => {
  if (typeof route.action !== 'string' || !Array.isArray(route.args)) {
    return null
  }

  try {
    var action = require(`${actionDir}/${route.action}`)
  } catch (error) {
    return null
  }

  return action.exec ? (...args) => action.exec(...route.args, ...args) : null
}

exports.mapRequestToAction = (request) => (
  mapRouteToAction(
    mapRequestToRoute(request)
  )
)
