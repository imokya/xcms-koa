const { Exception } = require('../core/exception')

const error = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      ctx.body = {
        msg: e.msg,
        code: e.code,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = e.status || 500
    }
  }
}

module.exports = error