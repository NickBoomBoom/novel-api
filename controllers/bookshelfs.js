const Bookshelfs = require('../models/bookshelf');
const Users = require('../models/users');
const {checkLogin} = require('../utils')

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

    const { _id:uid } = userInfo
    const res = await Bookshelfs.find({
      uid
    })
    ctx.body = {
      code: 200,
      data: res.map(t => t.novels)
    }
  }

  // 更新用户书单,无则新建,根据用户_id 为 uid 绑定数据信息
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

    const {list} = ctx.request.body
    const { _id } = userInfo

    // 检测该用户是否存在
    const currentUser = await Users.findOne({ _id })

    if (currentUser) {
      await Bookshelfs.update(
        { uid:_id },
        { uid:_id, novels: list },
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
