const xt = require('../src/application');
const app = xt();
app.get('/',function(req,res,next){
    res.end('hello');
    next()
},function(req,res,next){
    res.end('hello');
    next()
}).get('/',function(req,res,next){
    console.log(3)
    next()
});

app.listen(8000,() => {
    console.log('port is 8000')
})