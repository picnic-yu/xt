const http = require('http');
const url = require('url');
function createApplication(){
    console.log(1)

    //app其实就是真正的请求监听函数
    let app = function (req,res){
        console.log(2)
        const {pathname} = url.parse(req.url,true)
        for(let i =0;i<app.routes.length;i++){
            let route = app.routes[i]
            if(route.method == req.method.toLowerCase()
                && route.path == pathname){
                    return route.handler(req,res)
            }
        }
        res.end('not')
    }
    app.get = function(path,handler){
        console.log(3)
        app.routes.push({
            method:'get',
            path,
            handler
        })
    }
    app.routes = []
    app.listen = function(){
        console.log(4)
        let server = http.createServer(app);
        
        server.listen.apply(server,arguments);
    }
    return app;
}
module.exports = createApplication;