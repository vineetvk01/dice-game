const prompt = require('prompt');
const chalk = require('chalk');
const Game = require('./game');

const numberOfPlayersSchema = {
  properties: {
    players: {
      pattern: /(?<!\S)\d(?!\S)/,
      message: 'Players must be numbers between 1-9',
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

async function initialize(){
  console.clear();
  console.log(chalk.bold.blueBright('[[ The Game of Dice ]]'));
  console.log(chalk.yellowBright('Welcome 👋 to the CLI-Game. Please provide the following to start the game.'));
  
  console.log(chalk.yellowBright('\nPlease enter the total number of players playing the game. Between 0-9'));
  // const { players } = await prompt.get(numberOfPlayersSchema);
  const players = 4;
  
  console.log(chalk.yellowBright('\nPlease enter the winning score for the game.'));
  // const { winScore } = await prompt.get(winningScoreSchema);
  const winScore = 10;
  
  console.log(chalk.magentaBright(`\n\nEntered Players: ${players}, and Winning Score: ${winScore}`));
  console.log(chalk.bold.magentaBright(`\nStarting the Game..`));

  setTimeout(() => {
      const game = new Game(players, winScore);
      game.start();
  }, 400);
}

prompt.start();
initialize();

  // //
  // // Start the prompt
  // //
  // prompt.start();

  // //
  // // Get two properties from the user: username and email
  // //
  // prompt.get(['username', 'email'], function (err, result) {
  //   //
  //   // Log the results.
  //   //
  //   console.log('Command-line input received:');
  //   console.log('  username: ' + result.username);
  //   console.log('  email: ' + result.email);
  // });