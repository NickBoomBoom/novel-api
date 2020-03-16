const {
  findAll,
  add,
  update,
  login,
} = require('../controllers/users')

const router = require('koa-router')()

router.prefix('/users')

// 获取全部
router.get('/', findAll)
// 新增
router.post('/', add)
// 更新密码
router.post('/update', update)
// 登录
router.post('/login', login)

module.exports = router