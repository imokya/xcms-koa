const Router = require('koa-router')
const { find, findById, create, update, delete: del } = require('../controllers/article')
const auth = require('../middlewares/auth')

const router = new Router({
  prefix: '/article'
})

router.get('/', find)
router.get('/:id', findById)
router.patch('/:id', update)
router.delete('/:id', del)
router.post('/', create)

module.exports = router