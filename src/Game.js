import reader from 'readline-sync';
import Dealer from './Dealer';
import Player from './Player';

export default class Game {
  constructor(numberOfPlayers) {
    this.humanPlayers = new Array(numberOfPlayers)
      .fill(1)
      .map((_, idx) => new Player(`Player${idx}`));
    this.dealer = new Dealer();
    this.players = [this.dealer, ...this.humanPlayers];
  }

  start() {
    this.dealer.dealGame(this.players);
    console.log('Lets play!\n');
    this.gameLoop();
  }

  round() {
    this.players.forEach((player) => {
      if (player.enabled) {
        this.playerTurn(player);
        console.log('');
      }
    });
  }

  playerTurn(player) {
    const action = player.turn();
    if (action) {
      this.dealer.dealCard(player);
    }
  }

  gameLoop() {
    while (this.enabledPlayers().length > 1) {
      this.round();
    }
    this.winner = this.getWinner();
    if (this.winner) {
      this.winner.score += 1;
      console.log(`${this.winner.name} won!`);
    } else {
      console.log('Tie!');
    }
    this.printGameScore();

    const playAgain = reader.question('Play again? (y/n):  ');
    if (playAgain === 'n') {
      process.exit();
    }
    this.resetGame();
    this.start();
  }

  getWinner() {
    const winner = this.players.reduce(
      (acc, player) =>
        player.cardsValue <= 21 && player.cardsValue > acc.cardsValue
          ? player
          : acc,
      { name: 'No one', cardsValue: 0 },
    );
    const actuallyMultipleWinners = this.players.filter(
      (player) => player.cardsValue === winner.cardsValue,
    );
    if (actuallyMultipleWinners.length > 1) {
      return null;
    }
    return winner;
  }

  printGameScore() {
    console.log('Current Scoreboard: ');
    this.players.forEach((player) =>
      console.log(`${player.name}: ${player.score}`),
    );
  }

  enabledPlayers() {
    return this.players.filter((player) => player.enabled);
  }

  resetGame() {
    this.players.forEach((player) => player.resetHand());
    this.dealer.newDeck();
  }
}
