const Role = require('../models/role')
const { Exception } = require('../core/exception')
const config = require('../config')

class RoleCtl {
  constructor() {

  }

  async find(ctx) {
    const role = await Role.find()
    if (!role) throw new Exception('查询角色出错')
    ctx.body = {
      data: role,
      code: 20000
    }
  }

  async findById(ctx) {
    const role = await Role.findById(ctx.params.id)
    if (!role) throw new Exception('查询角色出错')
    ctx.body = {
      data: role,
      code: 20000
    }
  }

  async create(ctx) {
    const { name, routes } = ctx.request.body
    ctx.request.body.key = name
    const exist = await Role.findOne({ name })
    if (exist) throw new Exception('角色已存在', 409, 5000)
    const role = await new Role(ctx.request.body).save()
    ctx.body = {
      data: role,
      code: 20000
    }
  }

  async update(ctx) {
    const { name } = ctx.request.body
    if (name) ctx.request.body.key = name
    const role = await Role.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    )
    if (!role) throw new Exception('更新角色出错')
    ctx.body = {
      data: role,
      code: 20000
    }
  }

  async delete(ctx) {
    const role = await Role.findByIdAndDelete(ctx.params.id)
    if (!role) throw new Exception('删除用户出错')
    ctx.body = {
      code: 20000
    }
  }

}

module.exports = new RoleCtl

