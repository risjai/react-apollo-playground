const jwt = require('jsonwebtoken')
const YAML = require('yamljs')
const dbConfigData = YAML.load('dbConfig.yml');
const APP_SECRET = YAML.parse(dbConfigData.APP_SECRET)
function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}
