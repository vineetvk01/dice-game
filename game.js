const prompt = require('prompt');
const chalk = require('chalk');
const { getRandomInt, stopScreen } = require('./util');

const diceImage = {
  1: {
    image: `-----\n|   |\n| o |\n|   |\n-----`
  },
  2: {
    image: `-----\n|o  |\n|   |\n|  o|\n-----`
  },
  3: {
    image: `-----\n|o  |\n| o |\n|  o|\n-----`
  },
  4: {
    image: `-----\n|o o|\n|   |\n|o o|\n-----`
  },
  5: {
    image: `-----\n|o o|\n| o |\n|o o|\n-----`
  },
  6: {
    image: `-----\n|o o|\n|o o|\n|o o|\n-----`
  }
}

const rSchema = {
  properties: {
    r: {
      pattern: /[rR]{1}/,
      message: 'Please enter [R]',
      required: true
    },
  }
};

function Game(players, winScore) {
  this.players = players;
  this.winScore = winScore;
  this.currentScores = [];
  this.rankCard = [];
  this.currentPlayer = -1;
}

Game.prototype.initialize = function(){
  if(this.players < 1 || this.players > 9){
    throw new Error('Players count less than 0 or more than 10');
  }
  const scoresArray = new Array(this.players);
  scoresArray.fill(null);
  this.currentScores = scoresArray.map(() =>  []);
  this.currentScores[0] = [10] 

  const rankCardArray = new Array(this.players);
  rankCardArray.fill(-1);
  this.rankCard = rankCardArray;
}

Game.prototype.getNextPlayer = function(){

  const getNext = (currentPlayer) => (currentPlayer + 1) % this.players;
  
  // When No Current Player
  if(this.currentPlayer === -1){
    const playerIndex = getRandomInt(0, this.players - 1);
    this.setCurrentPlayer(playerIndex);
    return playerIndex;
  }

  
  // Catch when '6' was the last scored value
  const lastValue = this.currentScores[this.currentPlayer].slice(-1);
  if(lastValue === 6){
    console.log('\nHurray! Its your turn again 🎉🎉 \n');
    return this.currentPlayer;
  }

  let playerIndex = getNext(this.currentPlayer);

  // If already won loop all
  while(this.rankCard[playerIndex] !== -1){
    playerIndex = getNext(playerIndex);
  }

  
  // If two consecutive 1's
  const currentPlayerHasOnes = (currentPlayer) => {
    const [second, last] = this.currentScores[currentPlayer].slice(-2);
    return second === 1 && last === 1;
  }
  while(currentPlayerHasOnes(playerIndex)){
    console.log('\nOops! You missed this turn due to for consecutive Ones 😔\n');
    this.increaseScore(playerIndex, 0);
    playerIndex = getNext(playerIndex);
  }

  this.setCurrentPlayer(playerIndex);
  return playerIndex;
}

Game.prototype.setCurrentPlayer = function(index){
  this.currentPlayer = index;
}

Game.prototype.renderScore = function(){
  console.log(chalk.blueBright('Player     | ',chalk.red('Score'),'|',chalk.yellow('Rank')));
  this.currentScores.map((score, index) => {
    console.log(chalk.blueBright('---------------------------'));
    const rank = this.rankCard[index] === -1 ? '-' : this.rankCard[index];
    const scoreSum = score.reduce((acc, score) => acc + score, 0);
    console.log(chalk.blueBright(`| Player ${index + 1} :`), '   ', chalk.red(scoreSum), '   ', chalk.yellow(rank))
  })
  console.log(chalk.blueBright('---------------------------'));
}

Game.prototype.increaseScore = function (playerIndex, increaseBy) {
  this.currentScores[playerIndex].push(increaseBy);

  const sumOfPlayer = this.currentScores[playerIndex].reduce((acc, score) => acc + score, 0);
  if(sumOfPlayer > this.winScore){
    const latestRank = Math.max(...this.rankCard);
    this.rankCard[playerIndex] = latestRank === -1 ? 1 : latestRank + 1;

    console.log('Hurray ! Your rank is: ', this.rankCard[playerIndex]);
  }

  return sumOfPlayer;
}

Game.prototype.rollDice = function(){
  return new Promise((resolve) =>{
    let i = 5;
    const interval = setInterval(() => {
      console.clear();
      i--;
      const random = getRandomInt(1,6);
      console.log(diceImage[random].image);
      if(i===0){
        clearInterval(interval);
        resolve(random);
      }
    }, 800);
  })
  
}

Game.prototype.shouldGameContinue = function(){
  const playerInGame = this.rankCard.filter((rank) => rank === -1);
  if(playerInGame.length > 1){
    return true;
  }
  return false;
}

Game.prototype.start = async function(){
  this.initialize();
  prompt.start();
  
  while(this.shouldGameContinue()){
    console.clear();
    this.renderScore();

    const nextPlayer = this.getNextPlayer();
    
    console.log('Player', nextPlayer + 1 , ' [Press R to Roll The Dice]');
    const { r } = await prompt.get(rSchema);
    
    
    const value = await this.rollDice();
    console.log('🎲 Dice Stopped At :', value);
    if(value === 6){
      samePlayerTurn = true;
    }

    const newScore = this.increaseScore(nextPlayer, value);
    console.log(`Increasing Player ${nextPlayer + 1} score by ${value}. New Score ${newScore}`);
    await stopScreen(5000);
  }

  console.clear();
  console.log(chalk.magentaBright('Here are the results : '));
  this.renderScore();
}


module.exports = Game;