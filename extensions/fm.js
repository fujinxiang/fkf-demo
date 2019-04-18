const Router = require('koa-router')
const path = require('path');

let home = new Router()
// 子路由1
home.get('/', async ( ctx )=>{
  const relativePath = path.relative(process.cwd()+'/views', __dirname+'/views');

  await ctx.render(path.join(relativePath, 'hello'));
})

// 装载所有子路由
let router = new Router()

router.use('/fm', home.routes(), home.allowedMethods())

module.exports = router;