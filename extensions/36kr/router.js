const path = require('path');
const axios = require('axios');

module.exports = app => {
  const { router } = app;

  async function get36kr(userId, pageSize) {
    const url = `https://36kr.com/pp/api/search-column/authorpage?user_id=${userId}&per_page=${pageSize}`;

    const result = await axios.get(url);
    return result.data.data;
  }

  router.get('/36kr/:id', async ctx => {
    const relativePath = path.relative(
      process.cwd() + '/views',
      __dirname + '/views'
    );

    const numberReg = /^\d+$/g;
    const id = ctx.params.id;

    // 判断ID是否有效
    const valid = numberReg.test(id);

    let data;
    if (valid) {
      //获取 500 条文章链接
      data = await get36kr(id, 500);
    }

    await ctx.render(path.join(relativePath, 'index'), {
      data: data
    });
  });
};
