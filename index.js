/*COMMAND-LINE TOOL FOR CONSUMING APIs
	BY HENSHAW ROWLAND
	FOR ANDELA BOOT-CAMP
*/
var http = require('http');
//var fs = require('fs');
var requireReadLine = require("readline");
var readline = requireReadLine.createInterface({
	input: process.stdin, output: process.stdout
});

console.log("\n********************CLI-API-APP****************");
console.log("\n**********************BY***********************");
console.log("\n****************HENSHAW ROWLAND****************\n");
console.log("\n******************************************FOR**\n");
console.log("\n**********************ANDELA BOOTCAMP--DAY--2**\n");

var showCommands = "\n\tAvailable Commands\n" + '**  "films" - Command to consume api and Lists out all star-wars films\n' +
    '**  "xters" - Command to consume api and Lists out all star-wars major characters\n' +
    '**  "ships" - Command to consume api and display list of the major star wars ships\n' +
    '**   NOTE -- "YOU MUST BE CONNECTED TO THE INTERNET!"\n'+
    '          -- "ALL COMMANDS ARE IN SMALL LETTERS!"\n' +
    '          -- "ALL REQUESTS ARE GET REQUESTS!"\n' +
    '          ie. NO POSTS! NO DELETES! NO PUTS! ONLY Getting\n ' +
    '**   TO QUIT AT ANYTIME PRESS "CTRL+C" TWICE';

var filmsPrompt = '\nNOTE - STAR WARS FILMS ARE AVAILABE BY ID FOR EACH PARTS. e.g Part 3 - is "Return Of the Jedi"  ';
var xterPrompt = '\nSTAR WARS CHARACTERS ARE AVIALABLE BY ID. e.g 1 - for Luke Skywalker!';
var shipPrompt  ='\nSTAR WARS SHIP INFORMATION ARE AVAILABLE BY ID. e.g 9 - for the "DEATH STAR - Starship"';
//function to start app;
appStart();
function appStart() {
    readline.question("\nPLEASE ENTER 'ok' TO CONTINUE \n>>>", function(answer){
    	if(answer.trim() === "ok"){
    		console.log(showCommands);
    		readline.setPrompt(">>>");
			readline.prompt();
    	}else{
    		console.log('PRESS "CTRL+C" TWICE TO QUIT');
    	}
    });
}
function getApi(host,id){
	var url = host + id +'/';
	console.log("Performing GET Request...");
	var request = http.get(url,function(res){
		var body = "";
		res.on('data', function(data){
			body = body +data;
			/*console.log(body.title);
			console.log(data.director);
			console.log(data.opening_crawl);*/
			console.log(body);
			readline.setPrompt(">>>");
			readline.prompt();
		});
	});
}
function getFilmsApi(){
	console.log(filmsPrompt);
	readline.question("ENTER ID \n>>>", function(answer){
		var id = answer;
		var host = 'http://swapi.co/api/films/'
		getApi(host,id);
	});
}
function getXterApi(){
	console.log(xterPrompt);
	readline.question("ENTER ID \n>>>",function(answer){
		var id = answer;
		var host = 'http://swapi.co/api/people/';
		getApi(host,id);
	});
}
function getShipsApi(){
	console.log(xterPrompt);
	readline.question("ENTER ID \n>>>",function(answer){
		var id = answer;
		var host = 'http://swapi.co/api/starships/';
		getApi(host,id);
	});
}
readline.on('line',function(line){
	var lineResponse = line;
	if (line === "films") {
		getFilmsApi();
	}
	else if(line === "xters") {
		getXterApi();
	}
	else if(line === "ships") {
		getShipsApi();
	}
	else if(line === "help"){
		console.log(showCommands);
	}
	else{
		console.log("UNRECOGNIZED COMMAND!");
	}
});