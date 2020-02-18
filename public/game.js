var socket = io.connect("167.172.130.150:80")
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
var game = document.getElementById("game");
var iconfinish = document.getElementById("iconfinish");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var reconnectbuttons = [document.getElementById("reconnect0"),
document.getElementById("reconnect1"),
document.getElementById("reconnect2"),
document.getElementById("reconnect3"),
document.getElementById("reconnect4"),
document.getElementById("reconnect5"),
document.getElementById("reconnect6"),
document.getElementById("reconnect7")];
var left0 = document.getElementById("left0");
var left1 = document.getElementById("left1");
var left2 = document.getElementById("left2");
var left3 = document.getElementById("left3");
var right0 = document.getElementById("right0");
var right1 = document.getElementById("right1");
var right2 = document.getElementById("right2");
var right3 = document.getElementById("right3");
var icons = document.getElementById("icons");
var color1 = document.getElementById("color1");
var color2 = document.getElementById("color2");
var facetext = document.getElementById("facetext");
var acctext = document.getElementById("acctext");
kickstarternames = ["Meehow", "Fitzy", "Hannah", "MikeMemme", "LeslieMemme", "MattMemme", "AlexMemme", "Fitzy", "Jambrew", "Aidan", "Erin", "Andrew"];
var colors = ["black", "red", "yellow", "green", "blue", "orange", "pink", "gray", "purple", "brown"];
var accessory = ["none", "black tie", "red tie", "yellow tie", "green tie", "blue tie", "orange tie", "pink tie", "gray tie", "purple tie", "brown tie", "rainbow tie", "baseball cap", "bowler cap", "red scarf", "green scarf", "purple flower", "blue flower", "red flower", "square glasses", "purple shades", "cyan shades", "gray shades", "monocle", "golden monocle"];
var faces = ["grimace", "goofy", "embarrassed", "bored", "sad", "angry", "cute", "annoyed", "shifty", "happy"];
var acc = 0;
var outlinecolor = Math.floor(Math.random() * 10);
var bodycolor = Math.floor(Math.random() * 10);
var face = Math.floor(Math.random() * 10);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "24px CPro";
defquestions = {
	"d" : [
		"Boy, I sure do love _____.",
		"All aboard! Next stop, _____!",
		"How should I celebrate my birthday?",
		"What’s your best burn?",
		"This Just In! America has Banned _____",
		"What should I give up this New Years?",
		"What should I make my password?",
		"What should I dress as for Halloween?",
		"Who is your role model?",
		"How will the world end?",
		"That’s right! I was _____ all along!",
		"Do you know why I pulled you over?",
		"We’re finally going to _____!",
		"What's your superpower?",
		"Well, it all started with _____.",
		"What are you thankful for?",
		"How will I die?",
		"Who should be our World Leader?",
		"How many is too many?",
		"How should I propose?",
		"What's your favorite word?",
		"Stop! It's _____ time!",
		"What did you do today?",
		"You know me, always _____.",
		"What's the best family friendly swear word?",
		"No thank you sir, I prefer _____.",
		"The power of _____ compels you!",
		"How would you describe me, in one word?",
		"What would you buy first if you won the lottery?",
		"What song should I play for the first dance at my wedding?",
		"Welcome to prison. What crime are you in for?",
		"How should I introduce myself at the party tonight?",
		"What should I put on my custom license plate?",
		"What's at the end of the rainbow?",
		"Oh no! Not _____!",
		"Today, _____. Tomorrow, the world!",
		"What rumor should I start about my enemy?",
		"Tune in at 7 for a new episode of _____!",
		"What should I name my pet dog?",
		"Have you forgotten _____?!",
		"What's the secret to a happy life?",
		"What is the worst Christmas gift?",
		"What's your zombie apocalypse plan?",
		"Where should I hide the body?",
		"What would your candle scent be?",
		"If you could time travel, where's the first place you would go?",
		"What's a good conversation starter?",
		"What should my yearbook quote be?",
		"What are we doing this weekend?",
		"You, my dear, are _____.",
		
	]
}


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
	icons.style.display = "none";
	option1.style.display = "none";
	option2.style.display = "none";
};

socket.on("roomresponse", function(data){
	if (data == "false")
	{
		output.innerHTML = "<p>No room open by that name.</p>";
	}
	if (data == "true")
	{
		state = "icon";
		ResetElements();
		game.style.display = "none";
		instruction.style.display = "block";
		icons.style.display = "inline-block";
		color1.innerHTML = colors[outlinecolor].charAt(0).toUpperCase() + colors[outlinecolor].slice(1);
		color2.innerHTML = colors[bodycolor].charAt(0).toUpperCase() + colors[bodycolor].slice(1);
		facetext.innerHTML = faces[face].charAt(0).toUpperCase() + faces[face].slice(1);
		acctext.innerHTML = accessory[acc];
		instruction.innerHTML = "<p>Create Your Icon!</p>";
		socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
	}
});

socket.on("disconnect", function(data){
	ResetElements();
	instruction.style.display = "block";
	instruction.innerHTML = "Hmmm... Looks like you've been disconnected. Please refresh your page and rejoin.";
});
	
socket.on("command", function(data){
	if (data == "askquestion")
	{
		ResetElements();
		question.style.display = "block";
		submitquestion.style.display = "block";
		instruction.style.display = "block";
		option1.innerHTML = defquestions["d"][Math.floor(Math.random() * defquestions["d"].length)];
		option2.innerHTML = defquestions["d"][Math.floor(Math.random() * defquestions["d"].length)];
		while (option1.innerHTML == option2.innerHTML)
		{
			option2.innerHTML = defquestions["d"][Math.floor(Math.random() * defquestions["d"].length)];
		}
		option1.style.display = "block";
		option2.style.display = "block";
		instruction.innerHTML = "<p>Choose a question, or enter your own!</p>";
	}
});
	
socket.on("rejoining", function(data){
	state = "starting";
	game.style.display = "block";
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

right0.addEventListener("click", function(){
	outlinecolor = outlinecolor + 1;
	if (outlinecolor > 9)
	{
		outlinecolor = 0;
	}	
	color1.innerHTML = colors[outlinecolor].charAt(0).toUpperCase() + colors[outlinecolor].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

right1.addEventListener("click", function(){
	bodycolor = bodycolor + 1;
	if (bodycolor > 9)
	{
		bodycolor = 0;
	}	
	color2.innerHTML = colors[bodycolor].charAt(0).toUpperCase() + colors[bodycolor].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

right2.addEventListener("click", function(){
	face = face + 1;
	if (face > 9)
	{
		face = 0;
	}
	facetext.innerHTML = faces[face].charAt(0).toUpperCase() + faces[face].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

right3.addEventListener("click", function(){
	acc = acc + 1;
	if (acc >= accessory.length)
	{
		acc = 0;
	}
	if (acc >= accessory.length - 1 && kickstarternames.includes(username.value) == false )
	{
		acc = 0;
	}
	acctext.innerHTML = accessory[acc];
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

left0.addEventListener("click", function(){
	outlinecolor = outlinecolor - 1;
	if (outlinecolor < 0)
	{
		outlinecolor = 9;
	}	
	color1.innerHTML = colors[outlinecolor].charAt(0).toUpperCase() + colors[outlinecolor].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

left1.addEventListener("click", function(){
	bodycolor = bodycolor - 1;
	if (bodycolor < 0)
	{
		bodycolor = 9;
	}	
	color2.innerHTML = colors[bodycolor].charAt(0).toUpperCase() + colors[bodycolor].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

left2.addEventListener("click", function(){
	face = face - 1;
	if (face < 0)
	{
		face = 9;
	}
	facetext.innerHTML = faces[face].charAt(0).toUpperCase() + faces[face].slice(1);
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
});

left3.addEventListener("click", function(){
	acc = acc - 1;
	if (acc < 0 && kickstarternames.includes(username.value)==false)
	{
		acc = accessory.length - 2;
	}
	if (acc < 0)
	{
		acc = accessory.length - 1;
	}
	acctext.innerHTML = accessory[acc];
	socket.emit("sendicon",String(outlinecolor)+String(bodycolor)+String(face)+String(acc));
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

iconfinish.addEventListener("click", function(){
	ResetElements();
	socket.emit("sendicon","finished");
	game.style.display = "block";
	instruction.style.display = "block";
	instruction.innerHTML = "<p>Waiting for the game to start.</p>";
	state = "starting";
});

username.addEventListener("input", function(){
	console.log("howdy");
	console.log(ctx.measureText(username.value).width);
	
	if (ctx.measureText(username.value).width > 150)
	{
		username.value = username.value.slice(0,-1);
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

option1.addEventListener("click", function(){
	if (state == "starting")
	{
		state = "gettinganswers";
		socket.emit("sendquestion",option1.innerHTML)
		question.value = "";
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Players are submitting answers to your very important question.</p>";
	}
});

option2.addEventListener("click", function(){
	if (state == "starting")
	{
		state = "gettinganswers";
		socket.emit("sendquestion",option2.innerHTML)
		question.value = "";
		ResetElements();
		instruction.style.display = "block";
		instruction.innerHTML = "<p>Players are submitting answers to your very important question.</p>";
	}
});


