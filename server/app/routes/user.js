const Router = require('koa-router')
const { find, findById, create, update, delete: del, login } = require('../controllers/user')

const ruter = new Router({
  prefix: '/user'
})

ruter.get('/', find)
ruter.get('/:id', findById)
ruter.patch('/:id', update)
ruter.delete('/:id', del)
ruter.post('/', create)
ruter.post('/login', login)

module.exports = ruter