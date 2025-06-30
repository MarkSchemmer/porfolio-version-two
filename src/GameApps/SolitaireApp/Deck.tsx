

// shuffle, 
// draw 

import { Card } from "./Card";
import { CardBaseColor, cardImages, CardValues, Suits } from "./utils/Utils";

// generateDeck
class Deck {

    public deck: Card[];

    constructor() {
        this.deck = this.generateDeck();
    }

    public generateDeck = (): Card[] => {
        
        const spades = Object.entries(CardValues).map(([k, v], idx) => {
                const cardIdx = (Suits.SPADES + k) as string;
                const cardImg = (cardImages as any)[cardIdx]
                return new Card(cardImg, Suits.SPADES, CardBaseColor.BLACK, v, true);
        });

        return spades;
    }

    public draw = (): Card => {
        const card = this.deck.pop();
        return card as Card;
    }

}

export default new Deck();


