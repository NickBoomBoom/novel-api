
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * 检测用户登录
 * @param {*} ctx 
 * @return {object} 用户信息
 */
const checkLogin = ctx => {
  const token = ctx.cookies.get(config.cookieTokenKey)
  if (!token) {
    return null
  }
  const userInfo = jwt.verify(token, config.secretOrPrivateKey)
  return userInfo
}

const test = () => {
  
}


module.exports = {
  checkLogin
}
