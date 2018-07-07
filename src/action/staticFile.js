const fs = require('fs')
const pathMimeGuesser = require('mime-types')
const contentMimeGuesser = require('file-type')

module.exports = (request, response, filePath) => {
  let content = null

  try {
    content = fs.readFileSync(filePath)
  } catch (error) {
    console.error(`Error while reading static file at ${filePath}`)
  }

  if (content) {
    response.writeHead(200, {
      'Content-Type':
        pathMimeGuesser.lookup(filePath) ||
        (contentMimeGuesser(content) || {}).mime ||
        'application/octet-stream'
      ,
    })
    response.end(content)

    return
  }

  response.statusCode = 404
  response.end()
}
