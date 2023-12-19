import readlineSync from 'readline-sync';

const moves = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
};

const getUserAnswer = () => readlineSync.question('\nInput your move\n1. Rock\n2. Paper\n3. Scissors\n:');

const getMove = (move) => {
  const formattedMove = move.trim().toLowerCase();

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

  return moveMapping[formattedMove] || null;
};

const getRandomMove = () => Math.floor(Math.random() * 3) + 1;

const userIsWinner = (userMove, randomMove) => {
  const winMapper = {
    [moves.rock]: moves.scissors,
    [moves.paper]: moves.rock,
    [moves.scissors]: moves.paper,
  };

  if (userMove === randomMove) {
    return null; // Draw
  }

  return winMapper[userMove] === randomMove; // True if user win
};

const game = () => {
  const userAnswer = getUserAnswer();
  const userMove = getMove(userAnswer);

  if (!userMove) {
    console.log('\nIncorrect move, please, try again.');
    game();
    return;
  }

  const randomMove = getMove(getRandomMove().toString());

  const isUserWin = userIsWinner(userMove, randomMove);

  switch (isUserWin) {
    case true:
      console.log("Congratulations! You've won!");
      break;
    case null:
      console.log('Not bad, we have a draw');
      break;
    default:
      console.log("You've lost, try again :)");
      break;
  }
};

const run = () => {
  console.log('Welcome to the game "Rock Paper Scissors"!');
  game();
};

run();
