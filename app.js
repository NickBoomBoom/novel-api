const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
// const router = new Router()
const fs = require('fs')

// const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const cors = require('koa2-cors');
const config = require('./config')
const mongoConf = require('./config/mongo');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || config.port

mongoConf.connect();

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(cors())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  // .use(views(path.join(__dirname, '/views'), {
  //   options: { settings: { views: path.join(__dirname, 'views') } },
  //   map: { 'pug': 'pug' },
  //   extension: 'pug'
  // }))
  // .use(router.routes())
  // .use(router.allowedMethods())

// routes register
fs.readdirSync('./routes').forEach(route => {
  let api = require(`./routes/${route}`)
  app.use(api.routes(), api.allowedMethods())
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', function (err, ctx) {
  console.log('进入错误监听 ----------------------')
  console.error('server error', err)
  ctx.body = {
    code: 500,
    msg:'服务器错误'
  }
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
