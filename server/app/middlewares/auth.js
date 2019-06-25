const jwt = require('jsonwebtoken')
const config = require('../config')
const { Exception } = require('../core/exception')

const auth = async (ctx, next) => {
  const token = ctx.request.headers['x-token']
  if (!token) throw new Exception('令牌验证失败', 401, 50008)
  try {
    jwt.verify(token, config.secret)
    await next()
  } catch (e) {
    throw new Exception('令牌验证失败', 401, 50008)
  }
}

module.exports = auth