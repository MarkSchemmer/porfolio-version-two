// shuffle,
// draw

import { Card } from "./Card";
import { CardBaseColor, cardImages, CardValues, Suits } from "./utils/Utils";

export enum Pile {
  TABLEAU = "tableau",
  WASTEPILE = "waste",
  FOUNDATION = "foundation",
}

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

  private handlePileSearch = (pileToSearch: Card[][], id: string) => {
    const { foundCard, pileIndex, cardIndex } = pileToSearch.reduce(
      (acc, pile, i) => {
        if (acc.foundCard) return acc; // already found, skip remaining

        const idx = pile.findIndex((card) => card.uniqueId === id);
        if (idx !== -1) {
          return {
            foundCard: pile[idx],
            pileIndex: i,
            cardIndex: idx,
          };
        }

        return acc;
      },
      {
        foundCard: undefined as Card | undefined,
        pileIndex: -1,
        cardIndex: -1,
      }
    );

    return { foundCard, pileIndex, cardIndex };
  };

  public findWhereCardLives = (id: string) => {
    const tableau = this.handlePileSearch(this.tableauSets, id);

    if (tableau.foundCard)
      return {
        fromPile: Pile.TABLEAU,
        card: tableau.foundCard,
        pileIndex: tableau.pileIndex,
        cardIndex: tableau.cardIndex,
      };

    const inFoundation = this.handlePileSearch(this.ascendingPiles, id);

    if (inFoundation.foundCard)
      return {
        fromPile: Pile.FOUNDATION,
        card: inFoundation.foundCard,
        pileIndex: inFoundation.pileIndex,
        cardIndex: inFoundation.cardIndex,
      };

    const inDraw = this.drawWastePile[1].find((c) => c.uniqueId === id);

    if (inDraw) return { fromPile: Pile.WASTEPILE, card: inDraw };

    return null;
  };

  public handleTableuaToTableauDrop = (
    fromInfo: {
      fromPile: Pile;
      card: Card;
      pileIndex?: number;
      cardIndex?: number;
    },
    toIndex: number
  ) => {
    const toTable = this.tableauSets[toIndex];

    if (toTable.length === 0) {
      // has to be king only
      if (fromInfo.card.IsKing()) {
        toTable.push(fromInfo.card);
        this.removeCardFromTable(
          fromInfo.pileIndex as number,
          fromInfo.card.uniqueId
        );
      }
    } else {
      const lastCard = toTable[toTable.length - 1];

      if (lastCard.canStackOnTableau(fromInfo.card)) {
        toTable.push(fromInfo.card);
        this.removeCardFromTable(
          fromInfo.pileIndex as number,
          fromInfo.card.uniqueId
        );
      }
    }
  };

  public handleTableuaToFoundationDrop = (
    fromInfo: {
      fromPile: Pile;
      card: Card;
      pileIndex?: number;
      cardIndex?: number;
    },
    toIndex: number
  ) => {
    const toFoundation = this.ascendingPiles[toIndex];

    if (toFoundation.length === 0) {
      // has to be king only
      if (fromInfo.card.IsAce()) {
        toFoundation.push(fromInfo.card);
        this.removeCardFromTable(
          fromInfo.pileIndex as number,
          fromInfo.card.uniqueId
        );
      }
    } else {
      const lastCard = toFoundation[toFoundation.length - 1];

      if (lastCard.canStackOnTableau(fromInfo.card)) {
        toFoundation.push(fromInfo.card);
        this.removeCardFromTable(
          fromInfo.pileIndex as number,
          fromInfo.card.uniqueId
        );
      }
    }
  };

  public removeCardFromTable = (tabIdx: number, id: string) => {
    this.tableauSets[tabIdx] = this.tableauSets[tabIdx].filter(
      (c) => c.uniqueId !== id
    );
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
