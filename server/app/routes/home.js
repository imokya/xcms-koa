const Router = require('koa-router')
const { upload } = require('../controllers/home')

const router = new Router()

router.post('/upload', upload)

module.exports = router