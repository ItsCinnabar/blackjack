import Game from './Game';

const app = function app() {
  const numberOfPlayers = 2;
  const game = new Game(numberOfPlayers);
  game.start();
};

export default app;
