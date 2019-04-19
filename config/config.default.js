exports.appName = 'fm-koa-framework Demo';

exports.middleware = ['auth', 'locals', 'notFoundHandler'];

exports.session = {
  key: 'connect.magick',
  maxAge: 86400000,
  httpOnly: true,
  renew: true
}
