import readlineSync from 'readline-sync';

const moves = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
};

const moveMapping = {
  rock: moves.rock,
  r: moves.rock,
  1: moves.rock,

  paper: moves.paper,
  p: moves.paper,
  2: moves.paper,

  scissors: moves.scissors,
  s: moves.scissors,
  3: moves.scissors,
};

const getUserInput = (message = '') => readlineSync.question(message);

const getMove = (move) => {
  const formattedMove = move.trim().toLowerCase();

  return moveMapping[formattedMove] || null;
};

const getComputerMove = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  return moveMapping[randomNumber.toString()];
};

const userIsWinner = (userMove, computerMove) => {
  const winMapper = {
    [moves.rock]: moves.scissors,
    [moves.paper]: moves.rock,
    [moves.scissors]: moves.paper,
  };

  if (userMove === computerMove) {
    return null; // Draw
  }

  return winMapper[userMove] === computerMove; // True if user wins
};

const isYes = (string) => {
  switch (string.toLowerCase()) {
    case 'yes':
    case 'y':
      return true;
    default:
      return false;
  }
};

const game = () => {
  console.log('\nInput your move\n1. Rock\n2. Paper\n3. Scissors');

  const userAnswer = getUserInput('\nYour choice: ');
  const userMove = getMove(userAnswer);

  if (!userMove) {
    console.log('\nIncorrect move, please, try again.');
    game();
    return;
  }

  console.log(`You have chosen: ${userMove}`);

  const computerMove = getMove(getComputerMove().toString());

  console.log(`\nThe computer chooses: ${computerMove}`);

  const isUserWin = userIsWinner(userMove, computerMove);

  switch (isUserWin) {
    case true:
      console.log(`\nResult: Congratulations! You've won with "${userMove}" against "${computerMove}"!`);
      break;
    case null:
      console.log(`\nResult: Not bad, it's a draw. You both chose "${userMove}".`);
      break;
    default:
      console.log(`\nResult: You've lost. Your "${userMove}" is defeated by "${computerMove}". Try again :)`);
      break;
  }

  const playAgainUserInput = getUserInput('\nDo you want to play again? (yes/no): ');
  const playAgain = isYes(playAgainUserInput);

  if (playAgain) {
    game();
  }
};

const run = () => {
  console.log('Welcome to the game "Rock Paper Scissors"!');
  game();
  console.log('\nThanks for playing! See you!');
};

run();
