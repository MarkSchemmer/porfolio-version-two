/*

Solitaire app will work as the board or starting point, so the style and design of the board and display basically and 

Now we need some ideas conceptualized such as... 

Deck
Card

card pile -> where cards can move and be placed that have the style but know nothing of the lgoic of tableu, dealing pile, or ascending above final panel 

Tableu, -> which is the lower 7 card piles
Dealing Pile -> top left pile which can deal and draw
Ascending above final panel -> 4 top row piles 




*/
import { CSSProperties } from "react";
import backgroundImage from "../SolitaireApp/utils/gameImages/background.png";
import { Card } from "./Card";
import { CardBaseColor, cardImages, CardValues, Suits } from "./utils/Utils";

const pileBase: CSSProperties = {
  border: "2px solid black",
  borderRadius: "10px",
  aspectRatio: "2 / 3",
  minWidth: "6vw",
  minHeight: "12vh",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const aceSpades = new Card(
  cardImages.sa,
  Suits.SPADES,
  CardBaseColor.BLACK,
  CardValues.a,
  true
);

// Draw and Waste Piles
const DrawPile = () => (
  <div
    style={{
      ...pileBase,
      padding: "0.5vh",
      backgroundColor: "navy",
    }}
  >
    {aceSpades.draw("draw")}
  </div>
);

const WastePile = () => (
  <div
    style={{
      ...pileBase,
      padding: "0.5vh",
      backgroundColor: "navy",
    }}
  >
    {aceSpades.draw("waste")}
  </div>
);

// Foundation Piles (Ace piles)
const FoundationPile = ({ cards }: { cards: Card[] }) => {
  return (
    <div
      style={{
        ...pileBase,
        position: "relative",
        border: "2px solid black",
        borderRadius: "8px",
        backgroundColor: "crimson",
        overflow: "hidden", // hides underlying cards
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            width: "100%",
            height: "100%",
            zIndex: index, // optional: ensures correct top layer
          }}
        >
          {card.draw("foundation")}
        </div>
      ))}
    </div>
  );
};

// Tableau Piles
const TableauPile = ({ cards }: { cards: Card[] }) => {
  return (
    <div
      style={{
        ...pileBase,
        position: "relative", // enables absolute stacking
        width: "8vw",
        height: `${cards.length * 3.5}vh`, // dynamically grow height
        minHeight: "120px",
        backgroundColor: "green",
        border: "2px solid black",
        borderRadius: "8px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${index * 2.5}vh`, // vertical offset per card
            left: 0,
            right: 0,
            margin: "0 auto", // center the card horizontally
            width: "90%", // leave padding for stack look
            height: "10vh",
          }}
        >
          {card.draw("tableau")}
        </div>
      ))}
    </div>
  );
};


export const SolitaireApp = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "70vw",
        height: "70vh",
        padding: "2vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "2vh",
      }}
    >
      {/* Top Row: Draw/Waste and Foundation piles */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Draw & Waste */}
        <div style={{ display: "flex", gap: "1vw" }}>
          <DrawPile />
          <WastePile />
        </div>

        {/* Foundation piles (4) */}
        <div style={{ display: "flex", gap: "1vw" }}>
          <FoundationPile cards={[aceSpades, aceSpades]} />
          <FoundationPile cards={[]} />
          <FoundationPile cards={[]} />
          <FoundationPile cards={[]} />
        </div>
      </div>

      {/* Bottom Row: 7 Tableau piles */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-evenly", // spreads more evenly when small
          alignItems: "stretch",
          gap: "clamp(0.5vw, 1vw, 2vw)", // auto-gap that grows with screen
          padding: "1vh 1vw",
        }}
      >
        {Array.from({ length: 7 }).map((_, idx) => (
          <TableauPile key={idx} cards={[
            aceSpades, aceSpades, aceSpades
          ]} />
        ))}
      </div>
    </div>
  );
};
