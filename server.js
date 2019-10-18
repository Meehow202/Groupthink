var express  = require("express")
var socket = require("socket.io")

// App setup

var app = express();
console.log("*** STARTING SERVER ***")
var server = app.listen(80,function(){console.log("Listening for requests...")});

app.use(express.static("public"));

var io = socket(server);
var openrooms = [];

io.on("connection", (socket) => {

    console.log("made socket connection", socket.id);
	var room = "";
	var roomCreator = false;
	
    socket.on("createroom", function(data){
        console.log("Created Room",data);
		socket.join(data);
		openrooms.push(data);
		room = data;
		roomCreator = true;
		console.log(openrooms);
    });
	
	socket.on("joinroom", function(data){
        console.log(data.user,"Is Trying To Joining", data.room);
		if (openrooms.includes(data.room)) {
			room = data.room;
			socket.emit("roomresponse","true");
			socket.join(data);
			socket.to(room).emit("newuser", {message:data.user, sender: socket.id, id: ""});
		} else {
			socket.emit("roomresponse","false");
		}
    });
	
	socket.on("clientcommand", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("command",parsed.message);
    });
	
	socket.on("sendquestion", function(data){
		console.log(data);
		socket.to(room).emit("question",data);
    });
	
	socket.on("sendicon", function(data){
		console.log(data);
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
		console.log("reconnecting user");
		var parsed = JSON.parse(data);
		console.log(parsed.message);
        io.to(parsed.id).emit("rejoining",parsed.message);
    });
	
	socket.on("reconnectuser", function(data){
		console.log(data);
		socket.to(room).emit("reconnectuser",{message:data.oldname, sender: socket.id, id: data.newname});
    });
	
	socket.on("getvote", function(data){
		var parsed = JSON.parse(data);
        io.to(parsed.id).emit("getvote",{answer1:parsed.message, answer2:parsed.sender});
    });
	
	socket.on("addletter", function(data){
		console.log(data);
		socket.to(room).emit("addletter",{message:data, sender: socket.id, id: ""});
    });
	
	socket.on("chosenanswer", function(data){
		console.log(data)
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
        console.log(socket.id+" Disconnected.");
		if (roomCreator)
		{
			console.log(data);
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
});

