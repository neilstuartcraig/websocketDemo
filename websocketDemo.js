var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs=require("fs");
var path=require("path");
var config=require(path.join(__dirname, "/config/websocketDemoConfig.js"));

var port=config.server.port || 9001;
server.listen(port);

app.get('/*', function (req, res)
{
	var r=req.params[0]?req.params[0]:config.files.defaultFile;
	var f=path.join(__dirname, config.files.publicDir, r);

	if(fs.existsSync(f))
	{
		res.sendfile(f);
	}
	else
	{
		res.status(404).send('Not found');
	}
});

io.on('connection', function (socket)
{
	console.log("connection made...");

	socket.emit("msg", {msg:"Connected at "+(new Date().toUTCString())});

	socket.on("msg", function(msg)
	{
		console.log("received \""+msg.msg+"\", echoing...");
		socket.emit("msg", {msg:"Received: \""+msg.msg+"\" at "+(new Date().toUTCString())});
	});

	socket.on("disconnect", function()
	{
		console.log("disconnection");
	});
});