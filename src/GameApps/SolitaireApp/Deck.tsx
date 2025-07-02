// shuffle,
// draw

import { Card } from "./Card";
import { CardBaseColor, cardImages, CardValues, Suits } from "./utils/Utils";

// generateDeck
export class Deck {
  public deck: Card[] = [];

  public tableauSets: Card[][] = [[], [], [], [], [], [], []];

  public ascendingPiles: Card[][] = [[], [], [], []];

  public drawWastePile: Card[][] = [[], []];

  constructor() {
    this.boardAndDeckSetup();
  }

  public boardAndDeckSetup = () => {
    this.deck = this.generateDeck();

    this.tableauSets = this.tableauSets.map((c: Card[], idx: number) => {
      const amountOfCards = idx + 1;
      c = this.drawAmount(amountOfCards);
      let last = c[c.length - 1];
      last.makeShow();
      return c;
    });

    this.drawWastePile[0] = this.deck;
  };

  public generateDeck = (): Card[] => {
    const spades = Object.entries(CardValues).map(([k, v], idx) => {
      const cardIdx = (Suits.SPADES + k) as string;
      const cardImg = (cardImages as any)[cardIdx];
      return new Card(cardImg, Suits.SPADES, CardBaseColor.BLACK, v);
    });

    const clubs = Object.entries(CardValues).map(([k, v], idx) => {
      const cardIdx = (Suits.CLUBS + k) as string;
      const cardImg = (cardImages as any)[cardIdx];
      return new Card(cardImg, Suits.CLUBS, CardBaseColor.BLACK, v);
    });

    const diamonds = Object.entries(CardValues).map(([k, v], idx) => {
      const cardIdx = (Suits.DIAMONDS + k) as string;
      const cardImg = (cardImages as any)[cardIdx];
      return new Card(cardImg, Suits.DIAMONDS, CardBaseColor.RED, v);
    });

    const hearts = Object.entries(CardValues).map(([k, v], idx) => {
      const cardIdx = (Suits.HEARTS + k) as string;
      const cardImg = (cardImages as any)[cardIdx];
      return new Card(cardImg, Suits.HEARTS, CardBaseColor.RED, v);
    });

    return this.shuffle([...spades, ...clubs, ...diamonds, ...hearts]);
  };

  public drawAmount = (max: number) => {
    let cards: Card[] = [];
    let counter = 0;

    while (counter++ < max && this.deck.length > 0) {
      cards.push(this.deck.pop() as Card);
    }

    return cards;
  };

  public makeSetHidden = (cards: Card[]) => {
    cards.forEach((c) => {
      c.makeHidden();
    });
  };

  public draw = (): Card => {
    const card = this.deck.pop();
    return card as Card;
  };

  public handleDrawPileClick = () => {
    console.log("handling click");
    let [drawPile, wastePile] = this.drawWastePile;

    if (drawPile.length > 0) {
      const [c1, c2, c3, ...rest] = drawPile;

      const cardsToAdd = [c1, c2, c3].filter(
        (c) => c !== undefined && c !== null
      );

      wastePile = [...wastePile, ...cardsToAdd];

      this.drawWastePile = [rest, wastePile];
    } else {
      this.makeSetHidden(wastePile);
      this.drawWastePile = [wastePile.slice(), []];
    }
  };

  private shuffle = (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      const randIndex = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[randIndex];
      arr[randIndex] = temp;
    }

    return arr;
  };
}
