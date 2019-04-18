const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

class Application extends Koa {
    run() {
        const router = require('./router');

        const routers = loadExtensions().concat(router);
        routers.forEach(router=>{
            this.use(router.routes()).use(router.allowedMethods());
        })

        this.listen(3000, () => {
            console.log('[demo] route-use-middleware is starting at port 3000');
        });
    }
}


function loadExtensions(){
    const extensionsDir = path.join(process.cwd(), 'extensions');
    const files = fs.readdirSync(extensionsDir);
    const routers = [];
    files.forEach(file=>{
        const router = require(path.join(extensionsDir, file));
        if(router instanceof Router){
            routers.push(router);
        }
    })
    // const router = require('./extensions/router');
    return routers;
}


exports.Application = Application;
