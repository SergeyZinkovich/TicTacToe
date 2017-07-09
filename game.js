"use strict"
var Canvas = document.getElementById('canvas');
var Context = Canvas.getContext('2d');
var GameStatus = 0;
DrawField();
var Elem = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
createOnClickListener();
var Turn = 0;

function DrawField(){
	Context.fillStyle = "black";
	Context.beginPath();
	Context.moveTo(100,0);
	Context.lineTo(100, 300);
	Context.moveTo(200,0);
	Context.lineTo(200, 300);
	Context.moveTo(0, 100);
	Context.lineTo(300, 100);
	Context.moveTo(0, 200);
	Context.lineTo(300, 200);
	Context.closePath();
	Context.stroke();
}

function DrawElements(){
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			if (Elem[i][j] === 1){
				Context.beginPath();
				Context.moveTo(i * 100 + 10, j * 100 + 10);
				Context.lineTo(i * 100 + 90, j * 100 + 90);
				Context.moveTo(i * 100 + 90, j * 100 + 10);
				Context.lineTo(i * 100 + 10, j * 100 + 90);
				Context.closePath();
				Context.stroke();
			}
			else if (Elem[i][j] === 2){
				Context.beginPath();
				Context.arc(i * 100 + 50, j * 100 + 50, 40, 0, Math.PI * 2, true);
				Context.stroke();
			}
		}
	}
}

function CheckWin(player){
	if (((Elem[0][0] === player) && (Elem[0][1] === player) && (Elem[0][2] === player)) || 
		((Elem[1][0] === player) && (Elem[1][1] === player) && (Elem[1][2] === player)) || 
		((Elem[2][0] === player) && (Elem[2][1] === player) && (Elem[2][2] === player)) ||
		((Elem[0][0] === player) && (Elem[1][0] === player) && (Elem[2][0] === player)) ||
		((Elem[0][1] === player) && (Elem[1][1] === player) && (Elem[2][1] === player)) ||
		((Elem[0][2] === player) && (Elem[1][2] === player) && (Elem[2][2] === player)) ||
		((Elem[0][0] === player) && (Elem[1][1] === player) && (Elem[2][2] === player)) ||
		((Elem[0][2] === player) && (Elem[1][1] === player) && (Elem[2][0] === player))){
		GameStatus = 1;
		Context.fillStyle = "red";
		Context.fillRect(0, 100, 300, 100);
		if (player === 1){
			Context.fillStyle = "#00F";
			Context.font = "45pt Arial";
			Context.textAlign = "center";		
			Context.fillText("Player win", 150, 165);
		}
		else{
			Context.fillStyle = "#00F";
			Context.font = "35pt Arial";
			Context.textAlign = "center";
			Context.fillText("Computer win", 150, 165);
		}
		return true;
	}
	else if (Turn === 4){
		GameStatus = 1;
		Context.fillStyle = "red";
		Context.fillRect(0, 100, 300, 100);
		Context.fillStyle = "#00F";
		Context.font = "45pt Arial";
		Context.textAlign = "center";
		Context.fillText("Draw", 150, 165);
	}
	else{
		return false;
	}
}

function createOnClickListener(){
	Canvas.addEventListener('click', function(event) {
		if (GameStatus === 1){
			Restart();
			return;
		}
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;
		if (Elem[Math.floor(x / 100)][Math.floor(y / 100)] != 0){
			return;
		}
		Turn++;
		Elem[Math.floor(x / 100)][Math.floor(y / 100)] = 1;
		DrawElements();
		console.log("test");
		if (CheckWin(1)){return;}
		AITurn();
	}, false);	
}

function AITurn(){
	var a;
	do{
	a = Math.floor(Math.random()*9);
	} while (Elem[Math.floor(a / 3)][Math.floor(a % 3)] > 0);
	Elem[Math.floor(a/3)][Math.floor(a%3)] = 2;
	DrawElements();
	if (CheckWin(2)){return;}
}

function Restart(){
	Elem = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	GameStatus = 0;
	Turn = 0;
	Context.fillStyle = "white";
	Context.fillRect(0, 0, 300, 300);
	DrawField();
	DrawElements();
}