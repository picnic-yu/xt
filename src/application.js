const http = require('http');
const url = require('url');
const Router = require('./Router/index');

function Application(){
    this._router = new Router();
}
Application.prototype.lazyrouter = function(){
    if(!this._router){
        this._router = new Router();
    }
}
Application.prototype.get = function(path,handler){
    this.lazyrouter();
    this._router.get(path,handler);
}
Application.prototype.listen = function (){
    let self = this;
    let server = http.createServer(function(req,res){
        function done(){
            res.end('not found');
        }
        self._router.handle(req,res,done);
        
    });
    
    server.listen.apply(server,arguments);   
}
module.exports = Application;