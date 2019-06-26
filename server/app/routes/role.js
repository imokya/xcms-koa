const Router = require('koa-router')
const { find, findById, create, update, delete: del } = require('../controllers/role')
const auth = require('../middlewares/auth')

const router = new Router({
  prefix: '/role'
})

router.get('/', find)
router.get('/:id', findById)
router.patch('/:id', update)
router.delete('/:id', del)
router.post('/', create)

module.exports = router