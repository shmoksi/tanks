 var io = require('socket.io');
 var express=require('express');
 var app=express();
 var client=io();
 var mongoose = require('mongoose');
 const messageLimit=5;

 app.io=client;

    client.on('connection',function(socket){
	    var col = mongoose.connection.db.collection('messages');

        (col.find().sort({$natural: -1 }).limit(messageLimit)).toArray(function(err,res){
            if(err) 
            	throw err;
            socket.emit('output',res);
	    });

	    socket.on('input', function(data){
	        var name = data.name;
	        var message = data.message;
	        var time=data.time;

	        whitespace = /^\s*$/;

	        if(!whitespace.test(name) || !whitespace.test(message))
	        {
	            col.insert({name: name,message:message,time:time}, function(){
	                client.emit('output',[data]);
	            });
	        }
	    });
	 });

module.exports = app;