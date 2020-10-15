import reader from 'readline-sync';

export default class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.resetHand();
  }

  addCard(card) {
    this.cards = this.cards.concat(card);
    this.cardsValue = this.calculateHand();
  }

  calculateHand() {
    const value = this.cards.reduce((val, card) => val + card.value, 0);
    if (value > 21) {
      const firstHighAce = this.cards.find((card) => card.value === 11);
      if (firstHighAce) {
        firstHighAce.value = 1;
        return value - 10;
      }
    }
    return value`;
  }

  turn() {
    console.log(`${this.name}'s turn`);
    this.displayHand();

    const hit = this.requestCard();
    if (hit !== 'y') this.enabled = false;
    return hit === 'y';
  }

  /* eslint-disable-next-line class-methods-use-this */
  requestCard() {
    const action = reader.question('Hit? (y/n):  ');
    return action;
  }

  displayHand() {
    const hand = this.cards.map((card) => card.display());
    console.log(`Score: ${this.cardsValue}`);
    console.log(`Cards: ${hand.join(', ')}`);
  }

  resetHand() {
    this.enabled = true;
    this.cards = [];
    this.cardsValue = 0;
  }
}
