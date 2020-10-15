import Player from './Player';
import Deck from './Deck';

export default class Dealer extends Player {
  constructor() {
    super('Dealer');
    this.newDeck();
  }

  newDeck() {
    this.deck = new Deck().cards;
  }

  dealGame(players) {
    players.forEach((player) => {
      player.addCard(this.deck.pop());
      player.addCard(this.deck.pop());
    });
  }

  dealCard(player) {
    const card = this.deck.pop();
    console.log(`Dealt: ${card.display()}`);
    player.addCard(card);
    if (player.cardsValue <= 21) {
      console.log(`Score: ${player.cardsValue}`);
    } else {
      console.log(`Busted! Score: ${player.cardsValue}`);
      player.enabled = false;
    }
  }

  requestCard() {
    if (this.cardsValue < 17) {
      return 'y';
    }
    return 'n';
  }
}
