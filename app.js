const express=require('express');
const  app=express();
const bodyParser=require('body-parser');
const router=require('./routes/routes');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type, Accept , x-auth');
  
	next();
});

app.use('/',router);
module.exports=app;