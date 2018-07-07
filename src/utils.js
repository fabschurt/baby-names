const fs = require('fs')

const DOC_ROOT = `${__dirname}/../public`

exports.getStaticFilePath = (url) => {
  let path = DOC_ROOT + (url === '/' ? '/index.html' : url)

  return fs.existsSync(path) && fs.statSync(path).isFile() ? path : null
}

exports.escapeForRegExp = string => (
  string.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&')
)
