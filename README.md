##  [joi 验证数据模型](https://github.com/hapijs/joi/blob/master/API.md)
  https://www.jianshu.com/p/e6e277c1fda2

## 初始模型
  1. 通过密码来查看书单(彩蛋功能)


## 实践出真知 Q&A
  ### 1. 校验传输字段格式
      ex: 更新Users password 时, newPassword 字段为空时报错返回
      期待: 不在controllers层 判断是否为空,而是在进入前通过中间件 校验数据类型及格式

    

