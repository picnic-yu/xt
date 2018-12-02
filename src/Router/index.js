const Route = require('./route');
const Layer = require('./layer');
const url = require('url')
function Router(){
    this.stack = [];
}
Router.prototype.get = function (path,handler) {
    // 在往router里添加一层
    let route = this.route(path);
    // 向route里添加一层
    route.get(handler); 
}
// 创建一个Route实例，向当前路由系统中添加一个层
Router.prototype.route = function (path){
    let route = new Route(path);
    let layer = new Layer(path,route.dispatch.bind(route) );
    layer.route = route;
    return route;
}
Router.prototype.handle = function(req,res,out){
    let index = 0,self = this;
    let {pathname} = url.parse(req.url,true);
    function next () {
        if(index++ >= self.stack.length){
            return out();
        }
        let layer = self.stack[index++];
        if(layer.match(pathname) && layer.route && layer.route.handle_method(req.method.toLowerCase())){
            layer.handle_request(req,res,next);
        }else{
            next();
        }
    }
    next();
}
module.exports =  Router;
/**
 * Router
 *      stack
 *          layer
 *                 path route
 *                      method handler
 * Later
 * Router Layer 路径 处理函数(route.dispatch) 有一个特殊的route属性
 * Route Layer  路径 处理函数（真正的业务代码）有一个特殊的属性method
 */