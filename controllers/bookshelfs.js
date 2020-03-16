const Bookshelfs = require('../models/bookshelf');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config')

const checkLogin = ctx => {
  const token = ctx.cookies.get(config.cookieTokenKey)
  if (!token) {
    return null
  }
  const userInfo = jwt.verify(token, config.secretOrPrivateKey)
  return userInfo

}
class BookshelfsController {
  // 找寻用户书单
  async findBookshlef(ctx) {
    const userInfo = checkLogin(ctx)

    if (!userInfo) {
      // 用户未登录
      ctx.body = {
        code: 700,
        msg: '用户未登录'
      }
      return
    }

    const { username } = userInfo
    const res = await Bookshelfs.find({
      username
    })
    console.log(res, username)
    ctx.body = {
      code: 200,
      data: res.map(t => t.novels)
    }
  }

  // 更新用户书单,无则新建
  async update(ctx) {
    const userInfo = checkLogin(ctx)
    if (!userInfo) {
      // 用户未登录
      ctx.body = {
        code: 700,
        msg: '用户未登录'
      }
      return
    }

    const data = ctx.request.body
    const { username } = userInfo
    const { list } = data

    // 检测该用户是否存在
    const currentUser = await Users.findOne({ username })
    if (currentUser) {
      await Bookshelfs.update(
        { username },
        { username, novels: list },
        {
          upsert: true,
          runValidators: true,
        }
      )
      ctx.body = {
        code: 200,
        data: true
      }
      return
    } else {
      ctx.body = {
        code: 500,
        msg: '该用户不存在!'
      }
    }

  }
}

module.exports = new BookshelfsController();
