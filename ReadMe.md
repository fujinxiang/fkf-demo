### views
Koa 好像默认不支持多个 views 目录，为了让扩展模块支持独立的 views，只能使用相对路径的形式，同时，为了让扩展可以独立运行，让这个相对路由可以随环境变化。

``` js
  // 当扩展独立运行，即本身位于根目录时，relative 为空
  const relativePath = path.relative(process.cwd()+'/views', __dirname+'/views');

  await ctx.render(path.join(relativePath, 'hello'));
```