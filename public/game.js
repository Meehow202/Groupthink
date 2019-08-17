var socket = io.connect("67.207.84.116:80")
var noSleep = new NoSleep();

var roomcode = document.getElementById("roomcode")
var username = document.getElementById("username")
var join = document.getElementById("join")
var output = document.getElementById("output")
var instruction = document.getElementById("instruction")
var enter = document.getElementById("enter")
var finish = document.getElementById("finish")
var letter = document.getElementById("letter")
var question = document.getElementById("question")
var submitquestion = document.getElementById("submitquestion")
var answer = document.getElementById("answer")
var answer1 = document.getElementById("answer1")
var answer2 = document.getElementById("answer2")
var reconnect = document.getElementById("reconnect");
var reconnectbuttons = [document.getElementById("reconnect0"),
document.getElementById("reconnect1"),
document.getElementById("reconnect2"),
document.getElementById("reconnect3"),
document.getElementById("reconnect4"),
document.getElementById("reconnect5"),
document.getElementById("reconnect6"),
document.getElementById("reconnect7")];

answer.style.textDecoration = "underline";

var state = "login"

function ResetElements() 
{
	roomcode.style.display = "none";
	username.style.display = "none";
	join.style.display = "none";
	output.style.display = "none";
	instruction.style.display = "none";
	enter.style.display = "none";
	finish.style.display = "none";
	letter.style.display = "none";
	question.style.display = "none";
	submitquestion.style.display = "none";
	answer.style.display = "none";
	answer1.style.display = "none";
	answer2.style.display = "none";
};


socket.on("roomresponse", function(data){
	if (data == "false")
	{
		output.innerHTML = "<p>No room open by that name.</p>";
	}
	if (data == "true")
	{
		state = "starting";
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Waiting for the game to start, hang tight!</p>";
	}
});

socket.on("disconnect", function(data){
	ResetElements();
	instruction.style.display = "block";
	instruction.innerHTML = "Hmmm... Looks like you've been disconnected. Please refresh your page and rejoin with the same name.";
});
	
socket.on("command", function(data){
	if (data == "askquestion")
	{
		ResetElements();
		question.style.display = "block";
		submitquestion.style.display = "block";
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Enter a question, or a statement with a blank.</p>";
	}
});
	
socket.on("rejoining", function(data){
	var disconnected = data.split("|");
	instruction.innerHTML = "<p>Select a player to rejoin as.";
	console.log(disconnected);
	var i = 0;
	for (i = 0; i < disconnected.length; i++)
	{
		if (i < 8)
		{
			reconnectbuttons[i].style.display = "block";
			reconnectbuttons[i].innerHTML = disconnected[i];
		}
	}
	ResetElements();
	reconnect.style.display = "block";
	instruction.style.display = "block";
});

socket.on("getanswer", function(data){
	instruction.innerHTML = "<p>Submit your letter, or finish the word!</p>";
	letter.style.display = "block";
	finish.style.display = "block";
	enter.style.display = "block";
});

socket.on("getvote", function(data){
	if (state == "gettinganswers" || state == "starting")
	{
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Choose the answer you like more.</p>";
		answer1.innerHTML = data.answer1;
		answer2.innerHTML = data.answer2;
		answer1.style.display = "block";
		answer2.style.display = "block";
		state = "finished";
	}
});

socket.on("finalanswer", function(data){
	ResetElements();
	answer.style.display = "block";
	instruction.style.display = "block";
	instruction.innerHTML = "<p>Your team is finished! Waiting for the other team...</p>";
	state = "starting";
});

socket.on("setanswer", function(data){
	answer.innerHTML = "<p>"+data.split(' ').join('_')+"</p>"
	if (state == "starting")
	{
		ResetElements();
		answer.style.display = "block";
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Your team mates are submitting letters.</p>";
		state = "questions";
	}
});

reconnectbuttons[0].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[0].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[1].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[1].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[2].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[2].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[3].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[3].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[4].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[4].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[5].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[5].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[6].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[6].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});
reconnectbuttons[7].addEventListener("click", function(){
	socket.emit("reconnectuser",{oldname:reconnectbuttons[7].innerHTML, newname:username.value});
	reconnect.style.display = "none";
});

join.addEventListener("click", function(){
	if (state=="login")
	{
		noSleep.enable();
		if (roomcode.value!="" && username.value !="" && !username.value.includes("|"))
		{
			socket.emit("joinroom",{room : roomcode.value.toLowerCase(), user : username.value})
		}
		else if (roomcode.value == "")
		{
			output.innerHTML = "<p>Please enter a room code.</p>";
		}
		else if (username.value == "")
		{
			output.innerHTML = "<p>Please enter a username.</p>";
		}
		else if (username.value.includes("|"))
		{
			output.innerHTML = "<p>Please enter a valid username.</p>";
		}
		else
		{
			output.innerHTML = "<p>Waiting on server...</p>";
		}
	}
});

answer1.addEventListener("click", function(){
	if (state=="finished")
	{
		socket.emit("chosenanswer","0")
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Waiting for responses.</p>";
		state = "starting";
	}
});

answer2.addEventListener("click", function(){
	if (state=="finished")
	{
		socket.emit("chosenanswer","1")
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Waiting for responses.</p>";
		state = "starting";
	}
});

enter.addEventListener("click", function(){
	if (state=="questions" && letter.value.length > 0)
	{
		socket.emit("addletter", letter.value)
		letter.value = "";
		ResetElements();
		answer.style.display = "block";
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Your team mates are submitting letters.</p>";
	}
});

finish.addEventListener("click", function(){
	if (state=="questions")
	{
		socket.emit("finishanswer", "")
		letter.value = "";
		ResetElements();
		answer.style.display = "block";
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Waiting for responses.</p>";
		state = "finished";
	}
});

submitquestion.addEventListener("click", function(){
	if (state == "starting")
	{
		state = "gettinganswers";
		socket.emit("sendquestion",question.value)
		question.value = "";
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Players are submitting answers to your very important question.</p>";
	}
});
