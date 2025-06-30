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

const pileBase: CSSProperties = {
  border: "2px solid black",
  borderRadius: "10px",
  aspectRatio: "2 / 3",
  minWidth: "6vw",
  minHeight: "12vh",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

// Draw and Waste Piles
const DrawPile = () => <div style={{ ...pileBase, backgroundColor: "navy" }} />;
const WastePile = () => (
  <div style={{ ...pileBase, backgroundColor: "gray" }} />
);

// Foundation Piles (Ace piles)
const FoundationPile = () => (
  <div style={{ ...pileBase, backgroundColor: "crimson" }} />
);

// Tableau Piles
const TableauPile = () => (
  <div
    style={{
      ...pileBase,
      flexGrow: 1, // allow pile to expand
      flexBasis: "0", // base width is zero, evenly divides space
      minWidth: "6vw",
      maxWidth: "12vw",
      height: "100%",
      backgroundColor: "green",
    }}
  />
);

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
          <FoundationPile />
          <FoundationPile />
          <FoundationPile />
          <FoundationPile />
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
          <TableauPile key={idx} />
        ))}
      </div>
    </div>
  );
};
