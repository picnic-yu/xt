const xt = require('../src/application');
const app = xt();
app.get('/',function(req,res){
    res.end('hello')
});

app.listen(8000,() => {
    console.log('port is 8000')
})