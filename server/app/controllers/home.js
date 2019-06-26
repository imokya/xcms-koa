const path = require('path')

class HomeCtl {
  constructor() {

  }
  async upload(ctx) {
    const file = ctx.request.files.file
    const base = path.basename(file.path)
    ctx.body = {
      url: `${ctx.origin}/upload/${base}`
    }
  }
}

module.exports = new HomeCtl