const User = require('../models/user')
const { Exception } = require('../core/exception')

class SearchCtl {

  constructor() {

  }

  async find(ctx) {
    const user = await User.find()
    if (!user) throw new Exception('查询用户出错')
    ctx.body = {
      data: {
        items: user
      },
      code: 20000
    }

  }

}

module.exports = new SearchCtl