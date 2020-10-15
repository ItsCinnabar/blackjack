export default class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.rank = Card.rankSetter(value);
    this.value = Card.valueSetter(value);
  }

  static rankSetter(value) {
    switch (value) {
      case 1:
        return 'ace';
      case 11:
        return 'jack';
      case 12:
        return 'queen';
      case 13:
        return 'king';
      default:
        return value;
    }
  }

  static valueSetter(value) {
    switch (value) {
      case 1:
        return 11;
      case 11:
      case 12:
      case 13:
        return 10;
      default:
        return value;
    }
  }

  display() {
    return `${this.rank} of ${this.suit}`;
  }
}

Card.suits = ['club', 'diamond', 'heart', 'spade'];

Card.ranks = new Array(13).fill(1).map((_, i) => i + 1);
