const config = require('./config')
const routerManager = require('./routes')
const error = require('./middlewares/error')
const parser = require('koa-bodyparser')

const Koa = require('Koa')

const mongoose = require('mongoose')
mongoose.connect(config.db, { useNewUrlParser: true })

const app = new Koa()

app.use(error())
app.use(parser())
routerManager(app)

app.listen(config.port, () => {
  console.log(`server is running at port ${config.port}`)
})