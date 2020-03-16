const {
  findBookshlef,
  update,
} = require('../controllers/bookshelfs')

const router = require('koa-router')()

router.prefix('/bookshelf')
// 获取当前用户书单
router.get('/', findBookshlef)
// 上传书单
router.post('/update', update)

module.exports = router