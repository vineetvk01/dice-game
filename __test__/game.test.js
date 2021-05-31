const Game = require('../game');

describe("1. Proper next player in Game", () => {
  test("It should give proper next Player when current Player is 1", () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [1],
        [2],
        [1],
        [2]
      ],
      rankCard: [-1, -1, -1, -1]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(2);
  });

  test("It should give same Player when current player scored [6]", () => {
    const game = new Game(4, 10, {
      currentPlayer: 2,
      currentScores: [
        [1],
        [2],
        [6],
        []
      ],
      rankCard: [-1, -1, -1, -1]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(3);
  });


  test("It should skip next Player when it has [...values, 1, 1]", () => {
    const game = new Game(4, 10, {
      currentPlayer: 2,
      currentScores: [
        [1],
        [2],
        [6],
        [1, 1]
      ],
      rankCard: [-1, -1, -1, -1]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(0);
  });

  test("It should skip Player when it already has a rank", () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [1],
        [2],
        [11],
        [2]
      ],
      rankCard: [-1, -1, 1, -1]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(3);
  });

  test("It should skip 2 Players when they already have ranks", () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [1],
        [2],
        [11],
        [12]
      ],
      rankCard: [-1, -1, 1, 2]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(0);
  });

  test("It should skip 2 Players when it already has a rank and Next Player has [...values, 1, 1]", () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [1],
        [2],
        [11],
        [1, 1]
      ],
      rankCard: [-1, -1, 1, -1]
    });
    const nextPlayer = game.getNextPlayer();
    expect(nextPlayer).toEqual(0);
  });
});

describe("2. Proper stop of game", () => {
  test("It stop when only one player is left", () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [6,6],
        [6, 5],
        [6, 6],
        [2]
      ],
      rankCard: [1, 2, 3, -1]
    });
    const shouldGameContinue = game.shouldGameContinue()
    expect(shouldGameContinue).toEqual(false);
  });
});

describe("3. Dice is rolled", () => {
  test("It should produce a proper number", async () => {
    const game = new Game(4, 10, {
      currentPlayer: 1,
      currentScores: [
        [6,6],
        [6, 5],
        [6, 6],
        [2]
      ],
      rankCard: [1, 2, 3, -1]
    });
    try{
      const number = await game.rollDice(0);
      console.log(number);
      if(number < 7 && number > 0){
        expect(typeof number).toBe('number');
        return;
      }
      throw new Error('The number is out of range')
    }catch(err){
      throw err;
      // done(err);
    }
  });
});
