let fs = require('fs')
let yaml = require('js-yaml')

const configDir = `${__dirname}/../config`

exports.loadFromYaml = (relativeFilePath) => {
  try {
    return yaml.safeLoad(fs.readFileSync(`${configDir}/${relativeFilePath}`))
  } catch (exception) {
    return null
  }
}
