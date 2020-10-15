import Card from './Card';

export default class Deck {
  constructor() {
    this.cards = Deck.create();
    this.shuffle();
  }

  static create() {
    return Card.suits.reduce(
      (deck, suit) => [
        ...deck,
        ...Card.ranks.map((rank) => new Card(suit, rank)),
      ],
      [],
    );
  }

  shuffle() {
    this.cards = [...this.cards].sort(() => Math.random() - 0.5);
  }
}
