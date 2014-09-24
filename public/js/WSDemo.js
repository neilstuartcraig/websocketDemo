Zepto(function($)
{
	var io=window.io();

	var msgEnabler=function()
	{
		if($("#msg").val()==="")
		{
			$("#sendBtn").attr("disabled","disabled");
		}
		else
		{
			$("#sendBtn").attr("disabled",null);
		}
	};


	var sendMsg=function()
	{
		var m=$("#msg").val();
		if(m)
		{
			io.emit("msg", {msg:m});
			$("#msg").val("");
			msgEnabler();
			$("#msg").focus();
		}
	};

	$("#sendBtn").on('click', sendMsg);

	$("#mForm").on("submit", function(e)
	{
		e.preventDefault();
		sendMsg();
		return false;
	});

	msgEnabler();
	$("#msg").on("keyup", msgEnabler);



	io.on("msg", function(msg)
	{
		$("#output").html($("#output").html()+"<br />"+msg.msg);
	});

	// io.on("reconnect", function(err)
	// {
	// 	$("#output").html("ERROR: "+err);
	// });


	// icons
	io.on("connect", function(socket)
	{
		$("#icon-connected").html("Connected");
		$("#icon-connection").addClass("icon-good");
		$("#icon-connection").removeClass("icon-bad");
		$("#connectBtn").attr("disabled","disabled");
		$("#disconnectBtn").attr("disabled",null);
	});  

	io.on("disconnect", function(socket)
	{
		$("#icon-connected").html("Not connected");
		$("#icon-connection").removeClass("icon-good");
		$("#icon-connection").addClass("icon-bad");
		$("#disconnectBtn").attr("disabled","disabled");
		$("#connectBtn").attr("disabled",null);
	});  

	setInterval(function()
	{
		$("#icon-transport").html(io.io.engine.transport.name);
	}, 250);


	// buttons
	$("#disconnectBtn").on("click", function()
	{
		io.disconnect();
	});

	$("#connectBtn").on("click", function()
	{
		io.connect();
console.log("reconnections are currently not working...boo");		
	});

});