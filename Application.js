const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const fs = require('fs');
const path = require('path');

class Application extends Koa {
    init() {
        this.use(views(__dirname + '/views', {
            map: {
                html: 'ejs'
            }
        }));

        this.use(async function (ctx, next) {
            ctx.state = {
                title: 'this is a koa app'
            };

            await next();
        });
    }

    run() {
        this.init();

        const router = require('./router');

        const routers = loadExtensions().concat(router);
        routers.forEach(router => {
            this.use(router.routes()).use(router.allowedMethods());
        })


        this.on('error', (err, ctx)=>{
            console.log(err);
        })

        this.listen(3000, () => {
            console.log('[demo] route-use-middleware is starting at port 3000');
        });
    }
}


function loadExtensions() {
    const extensionsDir = path.join(process.cwd(), 'extensions');
    const files = fs.readdirSync(extensionsDir);
    const routers = [];
    files.forEach(file => {
        if(file.endsWith('.js')){
            const router = require(path.join(extensionsDir, file));
            if (router instanceof Router) {
                routers.push(router);
            }
        }
    })
    return routers;
}


exports.Application = Application;
