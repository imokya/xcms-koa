const User = require('../models/user')
const { Exception } = require('../core/exception')
const bcrypt = require('bcrypt')
const config = require('../config')
const jwt = require('jsonwebtoken')

class UserCtl {
  constructor() {

  }

  async info(ctx) {
    const { token } = ctx.query
    if (!token) throw new Exception('token验证失败', 401, 50008)
    try {
      const auth = jwt.verify(token, config.secret)
      const { id } = auth
      const user = await User.findById(id)
      ctx.body = {
        data: user,
        code: 20000
      }
    } catch (e) {
      throw new Exception('token验证失败', 401, 50008)
    }
  }

  async login(ctx) {
    const { name, pass } = ctx.request.body
    const user = await User.findOne({ name }).select('_id name pass')
    const auth = bcrypt.compareSync(pass, user.pass)
    if (!user || !auth) throw new Exception('登录失败', 401, 50008)
    const id = user.id.toString()
    const token = jwt.sign({ id, name }, config.secret, { expiresIn: '1d' })
    ctx.state.user = user
    ctx.body = {
      data: {
        token
      },
      code: 20000
    }
  }

  async logout(ctx) {
    ctx.body = {
      code: 20000
    }
  }

  async find(ctx) {
    let { page = 1, limit = 1, sort = '-time', name = '' } = ctx.query
    page = Math.max(page * 1, 1)
    limit = Math.max(limit * 1, 1)
    const where = {}
    if (name) where['name'] = name
    const user = await User.find(where).limit(limit).skip((page - 1) * limit).sort(sort)
    const total = await User.countDocuments()
    if (!user) throw new Exception('查询用户出错')
    ctx.body = {
      data: {
        items: user,
        total
      },
      code: 20000
    }
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) throw new Exception('查询用户出错')
    ctx.body = {
      data: user,
      code: 20000
    }
  }

  async create(ctx) {
    const { name, pass } = ctx.request.body
    const exist = await User.findOne({ name })
    if (exist) throw new Exception('用户已存在', 409, 5000)
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    ctx.request.body.pass = hash
    const user = await new User(ctx.request.body).save()
    ctx.body = {
      data: user,
      code: 20000
    }
  }

  async update(ctx) {
    const { pass } = ctx.request.body
    if (pass) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(pass, salt)
      ctx.request.body.pass = hash
    }
    const user = await User.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    )
    if (!user) throw new Exception('更新用户出错')
    ctx.body = {
      data: user,
      code: 20000
    }
  }

  async delete(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id)
    if (!user) throw new Exception('删除用户出错')
    ctx.body = {
      code: 20000
    }
  }

}

module.exports = new UserCtl

