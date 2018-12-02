const Layer = require('./layer');
function Route(path){
    this.path = path;
    this.stack = [];
    this.methods = {};//表示此路由有此方法的处理函数加速匹配
}
Route.prototype.get = function(handler){
    let layer = new Layer('/',handler);
    this.methods['get'] = true;
    this.stack.push(layer);
}

Route.prototype.handle_method = function(method){
    return this.methods[method];
}

Route.prototype.dispatch = function (req,res,out) {
    // 这里next 是走大层的匹配 next 是走到下一个路由
    let idx = 0, self = this;
    function next(){
        if(idx >= self.stack.length){
            out(); 
        }
        let layer = self.satck[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_method(req,res,next);
        }else{
            next();
        }
    }
    next();  
}
module.exports =  Route;