var express  = require("express")
var socket = require("socket.io")

// App setup

var app = express();
var server = app.listen(80,function(){console.log("Listening for requests...")});

app.use(express.static("public"));

var io = socket(server);
var openrooms = [];

io.on("connection", (socket) => {
	var room = "";
	var roomCreator = false;
	
    socket.on("createroom", function(data){
		if (openrooms.includes(data) == false)
		{
			socket.join(data);
			openrooms.push(data);
			room = data;
			roomCreator = true;
			console.log(openrooms);
			socket.emit("roomsuccess", {message:"true", sender: "", id: ""});
		}
		else
		{
			socket.emit("roomsuccess", {message:"false", sender: "", id: ""});
		}
    });
	
	socket.on("joinroom", function(data){
		if (openrooms.includes(data.room)) {
			room = data.room;
			socket.emit("roomresponse","true");
			socket.join(data);
			socket.to(room).emit("newuser", {message:data.user, sender: socket.id, id: ""});
		} else {
			socket.emit("roomresponse","false");
		}
    });
	
	socket.on("askquestion", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("getquestion",parsed);
    });
	
	socket.on("sendquestion", function(data){
		socket.to(room).emit("question",data);
    });
	
	socket.on("sendicon", function(data){
		socket.to(room).emit("geticon",{message:data, sender: socket.id, id: ""});
    });
	
	socket.on("finishanswer", function(data){
		socket.to(room).emit("finishanswer",{message:data, sender: socket.id, id: ""});
    });
	
	socket.on("finalanswer", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("finalanswer",parsed.message);
    });
	
	socket.on("rejoining", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("rejoining",parsed.message);
    });
	
	socket.on("reconnectuser", function(data){
		socket.to(room).emit("reconnectuser",{message:data.oldname, sender: socket.id, id: data.newname});
    });
	
	socket.on("getvote", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("getvote",{answer1:parsed.message, answer2:parsed.sender});
    });
	
	socket.on("addletter", function(data){
		socket.to(room).emit("addletter",{message:data, sender: socket.id, id: ""});
    });
	
	socket.on("chosenanswer", function(data){
		socket.to(room).emit("chooseanswer",data);
    });
	
	socket.on("getanswer", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("getanswer",parsed.message);
    });
	
	
	socket.on("setanswer", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("setanswer",parsed.message);
    });
	
	socket.on("disconnect", function(data){
		if (roomCreator)
		{
			var index = openrooms.indexOf(room);
			if (index > -1) {
				openrooms.splice(index, 1);
			}
			console.log(openrooms);
		}
		else if (room != "")
		{
			socket.to(room).emit("leavinguser", socket.id)
		}
    });
	socket.on("closeroom", function(data){
		if (roomCreator)
		{
			var index = openrooms.indexOf(room);
			if (index > -1) {
				openrooms.splice(index, 1);
			}
		}
    });
});

