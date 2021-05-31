const prompt = require('prompt');
const chalk = require('chalk');
const Game = require('./game');

const numberOfPlayersSchema = {
  properties: {
    players: {
      pattern: /[23456789]{1}/,
      message: 'Players must be numbers between 2-9',
      required: true
    },
  }
};

const winningScoreSchema = {
  properties: {
    winScore: {
      pattern: /^[0-9]+$/,
      message: 'Winning Score must be a number',
      required: true
    },
  }
};

async function startApp(){
  console.clear();
  console.log(chalk.bold.blueBright('[[ The Game of Dice ]]'));
  console.log(chalk.yellowBright('Welcome 👋 to the CLI-Game. Please provide the following to start the game.'));
  
  console.log(chalk.yellowBright('\nPlease enter the total number of players playing the game. Between 2-9'));
  const { players } = await prompt.get(numberOfPlayersSchema);
  // const players = 4;
  
  console.log(chalk.yellowBright('\nPlease enter the winning score for the game.'));
  const { winScore } = await prompt.get(winningScoreSchema);
  // const winScore = 10;
  
  console.log(chalk.magentaBright(`\n\nEntered Players: ${players}, and Winning Score: ${winScore}`));
  console.log(chalk.bold.magentaBright(`\nPress [Enter] to start the game`));

  
  await prompt.get(['enter']);
  const game = new Game(players, winScore);
  game.start();
}

prompt.start();
startApp();