// Number Guessing Game
const c = require("ansi-colors");
const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//generate random number based on difficulty setting
const numberGenerator = (difficulty) => {
  const maxNumber = 10 * difficulty;
  return (number = Math.floor(Math.random() * 10 * difficulty) + 1);
};

const difficultyLevel = () => {
  //check difficulty answer is within range - if not, reprompt
  const checkDifficulty = (answer) => {
    answer = parseInt(answer);
    if (answer >= 1 && answer <= 5) {
      console.log(`You Selected level ${answer}`);
      playGame(answer);
    } else {
      whatDifficulty();
    }
  };
  // prompt user for a difficulty level
  const whatDifficulty = () => {
    r1.question(`Choose a difficulty level between 1-5 `, (answer) => {
      checkDifficulty(answer);
    });
  };

  whatDifficulty();
};

const playGame = (difficulty) => {
  let computerNumber = numberGenerator(difficulty);
  let count = 1;

  const checkGuess = (answer) => {
    if (parseInt(answer.trim()) === computerNumber) {
      console.log(c.green("Well done! You guessed it!"));
      console.log(c.yellow(`Attempts: ${count}`));
      askPlayAgain();
    } else {
      console.log(`${c.red("Sorry try again!")} `);
      count++;
      askQuestion();
    }
  };

  const askQuestion = () => {
    r1.question(
      `Guess a number between 1 and ${10 * difficulty}: `,
      (answer) => {
        checkGuess(answer);
      }
    );
  };

  const askPlayAgain = () => {
    r1.question(`Play again? (y/n) `, (answer) => {
      answer = answer.trim().toLowerCase();
      if (answer === "y") {
        difficultyLevel();
      } else if (answer === "n") {
        r1.close();
      } else {
        console.log(
          "Invalid input. Please enter 'y' to play again or 'n' to quit."
        );
        askPlayAgain(); // Ask the play again question again
      }
    });
  };

  askQuestion();
};

difficultyLevel();
