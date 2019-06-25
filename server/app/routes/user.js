const Router = require('koa-router')
const { find, findById, create, update, delete: del, login, info, logout } = require('../controllers/user')
const auth = require('../middlewares/auth')

const ruter = new Router({
  prefix: '/user'
})

ruter.get('/', find)
ruter.get('/info', info)
ruter.get('/:id', findById)
ruter.patch('/:id', update)
ruter.delete('/:id', del)
ruter.post('/', create)
ruter.post('/login', login)
ruter.post('/logout', logout)


module.exports = ruter