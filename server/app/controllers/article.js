const Article = require('../models/article')
const { Exception } = require('../core/exception')
const config = require('../config')


class ArticleCtl {
  constructor() {

  }

  async find(ctx) {
    let { page = 1, limit = 1, sort = '-time', title = '' } = ctx.query
    page = Math.max(page * 1, 1)
    limit = Math.max(limit * 1, 1)
    const where = {}
    if (title) where['title'] = new RegExp(title)
    const article = await Article.find(where).limit(limit).skip((page - 1) * limit).sort(sort)
    const total = await Article.countDocuments()
    if (!article) throw new Exception('查询文章出错')
    ctx.body = {
      data: {
        items: article,
        total
      },
      code: 20000
    }
  }

  async findById(ctx) {
    const article = await Article.findById(ctx.params.id)
    if (!article) throw new Exception('查询文章出错')
    ctx.body = {
      data: article,
      code: 20000
    }
  }

  async create(ctx) {
    const article = await new Article(ctx.request.body).save()
    ctx.body = {
      data: article,
      code: 20000
    }
  }

  async update(ctx) {
    const article = await Article.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    )
    if (!article) throw new Exception('更新文章出错')
    ctx.body = {
      data: article,
      code: 20000
    }
  }

  async delete(ctx) {
    const article = await Article.findByIdAndDelete(ctx.params.id)
    if (!article) throw new Exception('删除文章出错')
    ctx.body = {
      code: 20000
    }
  }

}

module.exports = new ArticleCtl

