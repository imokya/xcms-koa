const User = require('../models/user')
const { Exception } = require('../core/exception')
const bcrypt = require('bcrypt')
const config = require('../config')
const jwt = require('jsonwebtoken')

class UserCtl {
  constructor() {

  }

  async login(ctx) {
    const { name, pass } = ctx.request.body
    const user = await User.findOne({ name }).select('_id name pass')
    const auth = bcrypt.compareSync(pass, user.pass)
    if (!user || !auth) throw new Exception('登录失败', 401, 50008)
    const id = user.id.toString()
    const token = jwt.sign({ id, name }, config.secret, { expiresIn: '1d' })
    ctx.body = {
      data: {
        token
      },
      code: 20000
    }
  }

  async find(ctx) {
    const user = await User.find()
    if (!user) throw new Exception('查询用户出错')
    ctx.body = {
      data: user,
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
    if (exist) throw new Exception('用户已存在', 409)
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
    const user = await User.findOneAndDelete(ctx.params.id)
    if (!user) throw new Exception('删除用户出错')
    ctx.status = 204
  }
}

module.exports = new UserCtl

