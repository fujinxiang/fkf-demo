const path = require('path');

module.exports = app => {
  const { router } = app;

  router.get('/', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    const routers = ctx.app.router.stack.map(x=>x.path);
    routers.splice(routers.indexOf('/'),1);

    await ctx.render(path.join(relativePath, 'index'), { routers: routers });
  });

  router.get('/page/404', async (ctx) => {
    ctx.body = '404 page!'
  }).get('/page/helloworld', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    await ctx.render(path.join(relativePath, 'hello'));
  });
}