const xt = require('../src/index');
const app = xt();
console.log(app)
app.get('/',function(req,res,next){
    res.end('hello');
    next()
});app.get('/',function(req,res,next){
    console.log(3)
    next()
});

app.listen(8000,() => {
    console.log('port is 8000')
})