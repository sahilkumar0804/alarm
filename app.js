var express= require('express');
var app=express();

app.use(express.static("img"));

app.get("/",(req,res)=>
{
    res.sendFile(__dirname + '/index.html');
});

app.get("/alarm",(req,res)=>
{
    res.sendFile(__dirname+'/alarm.html');
});



const server=app.listen("8000");
var io = require('socket.io')(server);

io.on('connect', function(client) 
{
     let e=null;
    client.on('timer', function(msg){
      e=setInterval(() => {
        var today = new Date();
        var min= (today.getMinutes()<10)?"0"+today.getMinutes():today.getMinutes();
        var hrs=today.getHours();
        var time = hrs + ":" +min;
        if(time==msg)
           { 
            client.emit("alert" ,time);
            clearInterval(e);
           }
        }, 1000);
      });
      client.on('disconnect', function() {
        {
            console.log(client.id);
            clearInterval(e);
        }
   });
});