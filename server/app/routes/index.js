const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((path)=> {
    if(path === 'index.js') return
    const router = require(`./${path}`)
    app.use(router.routes()).use(router.allowedMethods())
  })
}

