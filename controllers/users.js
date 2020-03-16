const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config')
class UsersController {
  async findAll(ctx) {
    const res = await Users.find()
    ctx.body = {
      code: 200,
      data: res
    }
  }

  async add(ctx) {
    const data = ctx.request.body
    // 查询是否存在相同username
    const res = await Users.findOne({ username: data.username })
    if (res) {
      ctx.body = {
        code: 500,
        msg: '用户名称重复!'
      }
    } else {
      const newUser = new Users({
        ...data,
        createAt: Date.now()
      })
      await newUser.save()
      ctx.body = {
        code: 200,
        data: true
      }
    }
  }

  async update(ctx) {
    const { username, password, newPassword } = ctx.request.body
    if (!newPassword) {
      ctx.body = {
        code: 500,
        msg: 'newPassword不能为空'
      }
      return
    }

    // 找到主体
    const body = {
      username, password,
    }
    
    const res = await Users.findOne(body)

    if (res) { // 存在即更新
      await Users.update({ _id: res._id }, {
        password: newPassword
      })
      ctx.body = {
        code: 200,
        data: true
      }
      return
    }

    // 错误返回
    ctx.body = {
      code: 500,
      msg: '用户名称或密码不对,请检查!'
    }
  }

  async login(ctx) {
    const data = ctx.request.body
    const res = await Users.findOne(data)
    if (res) {
      // 生成token 信息
      const { username, _id } = res
      const payload = {
        _id,
        username,
      }
      const token = jwt.sign(payload, config.secretOrPrivateKey)
      ctx.cookies.set(
        config.cookieTokenKey,
        token,
        {
          // domain: 'localhost',
          overwrite: false
        }
      )
      ctx.body = {
        code: 200,
        data: {username,token}
      }
      return
    }

    // 错误返回
    ctx.body = {
      code: 500,
      msg: '用户名或密码错误!'
    }
  }
}


module.exports = new UsersController();
