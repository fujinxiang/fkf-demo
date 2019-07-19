const path = require('path');

module.exports = app => {
  const { router } = app;

  router.get('/report', async ( ctx )=>{
    console.log(JSON.stringify(ctx.request.query))
    ctx.body = 'ok';
  })
}