const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <h1>驸马爷</h1>
  `
  ctx.body = html
})

// 装载所有子路由
let router = new Router()
router.use('/fm', home.routes(), home.allowedMethods())

module.exports = router;