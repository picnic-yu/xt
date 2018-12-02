const http = require('http');
const url = require('url');

function Application(){
    this._router = [
        {
            path:'*',
            method:'*',
            handler(req,res){
                res.end('not')
            }
        }
    ];
}
Application.prototype.get = function(path,handler){
    this._router.push({
        method:'get',
        path,
        handler
    })
}
Application.prototype.listen = function (){
    let self = this;
    let server = http.createServer(function(req,res){
        const {pathname} = url.parse(req.url,true)
        for(let i =1;i<self._router.length;i++){
            let {path,method,handler} = self._router[i];
            if(pathname == path && method == req.method.toLowerCase() ){
                return handler(req,res);
            }
            
        }
        self._router[0].handler(req,res);
    });
    
    server.listen.apply(server,arguments);   
}
module.exports = Application;