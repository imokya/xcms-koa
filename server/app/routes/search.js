const Router = require('koa-router')
const { find } = require('../controllers/search')

const router = new Router({
  prefix: '/search'
})

router.get('/user', find)

module.exports = router