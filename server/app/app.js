const config = require('./config')
const routerManager = require('./routes')
const error = require('./middlewares/error')
const parser = require('koa-body')
const path = require('path')
const koaStatic = require('koa-static')
const cors = require('@koa/cors')

const Koa = require('Koa')

const mongoose = require('mongoose')
mongoose.connect(config.db, { useNewUrlParser: true })

const app = new Koa()

app.use(cors({
  origin(ctx) {
    return '*'
  }
}))
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(error())
app.use(parser({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/upload'),
    keepExtensions: true
  }
}))
routerManager(app)

app.listen(config.port, () => {
  console.log(`server is running at port ${config.port}`)
})