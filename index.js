
const readlineSync = require("readline-sync");
const chalk = require("chalk");
const gradient = require("gradient-string");
const figlet = require("figlet");


var colorScheme = {
	//head: chalk.bold.underline.black.bgCyanBright,
	head: gradient.rainbow,
	tag: gradient.teen,
	play: chalk.bold.red.bgWhite,
	query: gradient.instagram,
	options: chalk.gray,
	score: gradient.passion,
	highScore: gradient.pastel
};

let scores = []
let highScore = 0;
let visitCount = 0;


let questions = [{
	query: "Would I rather be too busy or too bored?",
	options: ["Too busy", "Too bored"],
	answer: "Too busy" 
}, {
	query: "Which movie genre would I prefer?",
	options: ["Horror","Romance", "Adventure", "Comedy", "Sci-fi", "Animation"],
	answer: "Sci-fi"
}, {
	query: "What is my favorite season?",
	options: ["Winter","Spring", "Summer", "Monsoon", "Autumn"],
	answer: "Monsoon"
}, {
	query: "Would I rather live without a phone or the Internet",
	options: ["Without Internet", "Without phone"],
	answer: "Without phone"
}, {
	query: "Out of these scenarios, how would I react at a party?",
	options: ["I would sit down and observe everyone", "Dance along with people", "Leave early", "Attempt to talk to people"],
	answer: "Leave early"
}];

function readInput(prompt) {
	return readlineSync.question(prompt);
}

function writeOutput(message) {
	console.log(message);
}

function displayScores() {
	let userScore = scores[scores.length-1];
	writeOutput(colorScheme.score("\nYour score: " + userScore + "/"+questions.length));

	if(userScore >= highScore) {
		highScore = userScore;
		writeOutput(colorScheme.highScore("You have the highest score among "+(visitCount-1)+" other people who also took the quiz!"));
	}

	writeOutput(colorScheme.score("UserID\tScore"));
	for(let i=0; i<scores.length; i++) {
		writeOutput(colorScheme.score(i + "\t" + scores[i]));
	}
}


function quiz(questions) {

	writeOutput(colorScheme.head(figlet.textSync('QuizMate!', {
    horizontalLayout: 'full',
	})));

	writeOutput(colorScheme.tag("\nHow well do you know me?\n"));

	let play = true;

	while(play) {
		play = readlineSync.keyInYN(colorScheme.play('\nDo you want to play?'));

		if( play === false || play === "") {
			console.log(colorScheme.play('K. Bye.'));
			process.exit();
		}

		writeOutput(colorScheme.head("\nLet's start!\n"));

		console.log(colorScheme.play("\nYour user ID:" + visitCount));
		scores.push(0);
		visitCount++;

		for(let i=0; i<questions.length; i++) {
			let index = readlineSync.keyInSelect(questions[i].options, colorScheme.query(questions[i].query), {cancel:"Skip this question"});

			if(questions[i].options[index] === questions[i].answer) {
				writeOutput("Correct!");
				scores[scores.length-1]++;
			}
			else {
				writeOutput(colorScheme.play("Wrong! It's "+ questions[i].answer));
			}
			writeOutput("------------------------------------------");
		}

		displayScores();
	}
}

quiz(questions);


	


