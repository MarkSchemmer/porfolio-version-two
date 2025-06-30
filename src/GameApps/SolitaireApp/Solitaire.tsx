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
import { CSSProperties, useState } from "react";
import backgroundImage from "../SolitaireApp/utils/gameImages/background.png";
import { Card } from "./Card";
import { CardBaseColor, cardImages, CardValues, Suits } from "./utils/Utils";
import Deck from "../SolitaireApp/Deck";

import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

const pileBase: CSSProperties = {
  border: "2px solid black",
  borderRadius: "10px",
  aspectRatio: "2 / 3",
  minWidth: "6vw",
  minHeight: "12vh",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const card1 = Deck?.draw();
const card2 = Deck?.draw();
const card3 = Deck?.draw();
const card4 = Deck?.draw();
const card5 = Deck?.draw();
const card6 = Deck?.draw();

const tablueSets: Card[][] = [[], [card5, card6], [], [], [], [], []];

// Draw and Waste Piles
const DrawPile = ({ activeId }: { activeId: string | null }) => (
  <div
    style={{
      ...pileBase,
      position: "relative",
      border: "2px solid black",
      borderRadius: "8px",
      backgroundColor: "navy",
    }}
  >
    {card1?.draw("draw", card1.uniqueId, activeId)}
  </div>
);

const WastePile = ({ activeId }: { activeId: string | null }) => (
  <div
    style={{
      ...pileBase,
      position: "relative",
      border: "2px solid black",
      borderRadius: "8px",
      backgroundColor: "navy",
    }}
  >
    {card2?.draw("waste", card2.uniqueId, activeId)}
  </div>
);

// Foundation Piles (Ace piles)
const FoundationPile = ({
  cards,
  activeId,
  fpId,
}: {
  cards: Card[];
  activeId: string | null;
  fpId: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: fpId });
  return (
    <div
      ref={setNodeRef}
      style={{
        ...pileBase,
        position: "relative",
        border: "2px solid black",
        borderRadius: "8px",
        backgroundColor: "crimson",
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
          {card?.draw("foundation", card.uniqueId, activeId)}
        </div>
      ))}
    </div>
  );
};

// Tableau Piles
const TableauPile = ({
  cards,
  idx,
  activeId,
}: {
  cards: Card[];
  idx: number;
  activeId: string | null;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: "tableau-pile-" + idx });

  return (
    <div
      ref={setNodeRef}
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
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${index * 2.5}vh`, // vertical offset per card
              left: 0,
              right: 0,
              margin: "0 auto", // center the card horizontally
              width: "90%", // leave padding for stack look
              height: "12vh",
            }}
          >
            {card.draw("tableau", card.uniqueId, activeId)}
          </div>
        );
      })}
    </div>
  );
};

export const SolitaireApp = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("hello");
    setActiveId(null);
    const { active, over } = event;
    if (over && active) {
      console.log(`Dropped ${active.id} on ${over.id}`);
      // You'll implement game logic here later
    }
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId((event?.active?.id as string) || null);
      }}
      onDragEnd={(event) => handleDragEnd(event)}
    >
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
            <DrawPile activeId={activeId} />
            <WastePile activeId={activeId} />
          </div>

          {/* Foundation piles (4) */}
          <div style={{ display: "flex", gap: "1vw" }}>
            <FoundationPile
              cards={[card3, card4]}
              activeId={activeId}
              fpId={"foundation-pile-1"}
            />
            <FoundationPile
              cards={[]}
              activeId={activeId}
              fpId={"foundation-pile-1"}
            />
            <FoundationPile
              cards={[]}
              activeId={activeId}
              fpId={"foundation-pile-1"}
            />
            <FoundationPile
              cards={[]}
              activeId={activeId}
              fpId={"foundation-pile-1"}
            />
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
            <TableauPile
              key={idx}
              cards={tablueSets[idx]}
              idx={idx}
              activeId={activeId}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};
