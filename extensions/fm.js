const Router = require('koa-router')
const views = require('koa-views');

let home = new Router()
// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <h1>驸马爷</h1>
  `
  await ctx.render('../extensions/views/fm.html');
})

// 装载所有子路由
let router = new Router()

// router.use(views(__dirname + '/views', {
//   map: {
//       html: 'ejs'
//   }
// }));

router.use('/fm', home.routes(), home.allowedMethods())

module.exports = router;