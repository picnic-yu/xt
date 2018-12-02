const http = require('http');
const url = require('url');
let router =  [
    {
        path:'*',
        method:'*',
        handler(req,res){
            res.end('not')
        }
    }
]
function createApplication(){ 
    return {
        get (path,handler){
            console.log(3)
            router.push({
                method:'get',
                path,
                handler
            })
        },
        listen (){
            let server = http.createServer(function(req,res){
                const {pathname} = url.parse(req.url,true)
                for(let i =1;i<router.length;i++){
                    let {path,method,handler} = router[i];
                    if(pathname == path && method == req.method.toLowerCase() ){
                        return handler(req,res);
                    }
                    
                }
                router[0].handler(req,res);
            });
            
            server.listen.apply(server,arguments);
        }
    }
}
module.exports = createApplication;