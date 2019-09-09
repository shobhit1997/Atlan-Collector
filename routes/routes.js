const express=require('express');
const router=express.Router();
const { fork } = require('child_process');
const isRunning=require('is-running');
var Redis = require("ioredis");
var redis = new Redis({host:"redis"});
var redisCache = new Redis({host:"redis"});
var pub = new Redis({host:"redis"});

redis.subscribe("baseline-upload","export-request","bulk-create",function(err,count){
	if(err){
		console.log(err);
	}
	else{
		console.log(`Subscribed to ${count} channels`);
	}
});

redis.on("message",async function(channel,message){
	console.log("message");
	let compute;
	if(channel==='baseline-upload'){
		const pid=await redisCache.get('baseline-upload');	
		if(pid){
			if(isRunning(pid)){
				process.kill(pid)
				console.log('killed',pid)
			}
		}
		compute= fork('./routes/baseline-upload.js');
		await redisCache.set('baseline-upload',compute.pid)
	}
	else if(channel==='export-request'){
		const pid=await redisCache.get('export-request');	
		if(pid){
			if(isRunning(pid)){
				process.kill(pid)
				console.log('killed',pid)
			}
		}
		compute= fork('./routes/export-request.js');
		await redisCache.set('export-request',compute.pid)
	}
	else{
		const pid=await redisCache.get('bulk-create');	
		if(pid){
			if(isRunning(pid)){
				process.kill(pid)
				console.log('killed',pid)
			}
		}
		compute= fork('./routes/bulk-create.js');
		await redisCache.set('bulk-create',compute.pid)
	}
	console.log({pid:compute.pid,message:"started"})
	compute.send(message);
	compute.on('message', sum => {
  		console.log(sum);
	});
	compute.on('exit',message=>{
		console.log("Process Exit")
	})	

})

router.route('/bulk-create')
	.get(async function(req,res){
		pub.publish("bulk-create",req.query);
		res.send({message:"success"});
	})
router.route('/export-request')
	.get(async function(req,res){
		pub.publish("export-request",req.query);
		res.send({message:"success"});
	})
router.route('/baseline-upload')
	.get(async function(req,res){
		pub.publish("baseline-upload",req.query);
		res.send({message:"success"});
	})
module.exports=router;