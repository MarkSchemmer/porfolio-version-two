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

import { DndContext, DragEndEvent, DragOverlay, useDroppable } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { getDeck, UpdateDeck } from "../../store/slices/solitaireSlice";
import { Deck, Pile } from "./Deck";
import { DraggableCard } from "./DraggableCard";

const pileBase: CSSProperties = {
  border: "2px solid black",
  borderRadius: "10px",
  aspectRatio: "2 / 3",
  minWidth: "6vw",
  minHeight: "12vh",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

// Draw and Waste Piles
const DrawPile = ({
  activeId,
  deck,
}: {
  activeId: string[] | null;
  deck: Deck;
}) => {
  const dispatch = useDispatch();
  // random card to show back on the boolean of there are cards still in the deck and not empty...
  const card = new Card("", Suits.SPADES, CardBaseColor.BLACK, 1200, false);
  const cardDisplay =
    deck.drawWastePile[0].length > 0 ? <DraggableCard card={card} context="waste" isOverLay={false} />: null;
  return (
    <div
      style={{
        ...pileBase,
        position: "relative",
        border: "2px solid black",
        borderRadius: "8px",
        backgroundColor: "navy",
      }}
      onClick={(event: any) => {
        deck.handleDrawPileClick(); // flip 3 cards to waste pile
        dispatch(UpdateDeck(deck));
      }}
    >
      {cardDisplay}
    </div>
  );
};

/*
  get the last the items on the waste pile 
  and then add some styles so they are properly displayed 
*/
const WastePile = ({
  activeId,
  deck,
}: {
  activeId: string[] | null;
  deck: Deck;
}) => {

  const [_, wastePile] = deck.drawWastePile;

  const toDrawFrom = wastePile.slice(-3).filter(
    (c: Card) => c !== null && c !== undefined
  ).map(c => {
    c.makeShow();
    return c;
  }).map((c, idx, arr) => {
    // return { func: () => c.draw( idx === arr.length - 1 ? "lastCardOnWaste": "waste", c.uniqueId), key: c.uniqueId }
    return { card: c, context: idx === arr.length - 1 ? "lastCardOnWaste": "waste", key: c.uniqueId} 
  })

  return (
    <div
      style={{
        ...pileBase,
        position: "relative",
        border: "2px solid black",
        borderRadius: "8px",
        backgroundColor: "navy",
      }}
    >
      {toDrawFrom.map((c: any, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: `${index * 1.4}vw`,
            width: "100%",
            height: "100%",
            zIndex: index,
          }}
        >
          <DraggableCard card={c.card} context={c.context} isOverLay={false}/>
        </div>
      ))}
    </div>
  );
};

// Foundation Piles (Ace piles)
const FoundationPile = ({
  cards,
  activeId,
  fpId,
}: {
  cards: Card[];
  activeId: string[] | null;
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
          {/* {card?.draw("foundation", card.uniqueId, activeId)} */}
          <DraggableCard card={card} context={"foundation"} activeId={activeId} isOverLay={false} /> 
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
  activeId: string[] | null;
}) => {
  const deck = useSelector(getDeck) as Deck;
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
      {cards
      .map((card, index) => {
        // if (activeId?.includes(card.uniqueId)) return null; // Skip rendering while dragging
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
            {/* {card.draw("tableau", card.uniqueId, activeId)} */}
            <DraggableCard context={"tableau"} card={card} activeId={activeId} isOverLay={false} />
          </div>
        );
      })}
    </div>
  );
};

export const SolitaireApp = () => {
  const deck = useSelector(getDeck) as Deck;
  const dispatch  = useDispatch();
  const [activeId, setActiveId] = useState<string[] | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    const fromInfo = deck.findWhereCardLives(active.id.toString());
    if (over && active && fromInfo) {
      console.log(`Dropped ${active.id} on ${over.id}`);
      console.log(fromInfo);
      const toPile: Pile = over.id.toString().split('-')[0] as Pile;
      const toIdx: number = parseInt(over.id.toString().split('-')[2]);
      const {fromPile, card} = fromInfo;

      const fromTableau = fromPile === Pile.TABLEAU;
      const fromWastePile = fromPile === Pile.WASTEPILE;

      const toTableau = toPile === Pile.TABLEAU;
      const toFoundation = toPile === Pile.FOUNDATION;

      const tableauToTableau = fromTableau && toTableau;
      const tableauToFoundation = fromTableau && toFoundation;

      const wasteToTableau = fromWastePile && toTableau;
      const wasteToFoundation = fromWastePile && toFoundation;

      if (tableauToTableau) {
        deck.handleTableuaToTableauDrop(fromInfo, toIdx);
        dispatch(UpdateDeck(deck));
        return;
      }

      if (tableauToFoundation) {
        deck.handleTableuaToFoundationDrop(fromInfo, toIdx - 1);
        dispatch(UpdateDeck(deck));
        return;
      }

      if (wasteToTableau) {
        deck.handleWasteToTableauDrop(fromInfo, toIdx);
        dispatch(UpdateDeck(deck));
        return;
      }

      if (wasteToFoundation) {
        deck.handleWasteToFoundationDrop(fromInfo, toIdx - 1);
        dispatch(UpdateDeck(deck));
        return;
      }

      /*
      
         tableau -> tableau 

         tableau -> ascending 

         draw -> tableau

         draw -> ascending 

         ascending -> tableua 
    
      */

      // You'll implement game logic here later
    }
  };

  const [asc1, asc2, asc3, asc4] = deck.ascendingPiles;

  return (
    <DndContext
      onDragStart={(event) => {
        // write logic for if it's a tabluea event
        // then func the design to know if it has descendants
        // console.log(event.active);

        // store id
        // find where we are dragging
        const fromId = event?.active?.id as string || null;

        if (fromId) {
             const fromInfo = deck.findWhereCardLives(fromId);

             if (fromInfo?.fromPile === Pile.TABLEAU) {
                const tabIdx = fromInfo.pileIndex as number;
                const tabIdxLen = deck.tableauSets[tabIdx].length;
                const sliceOfCards = deck.tableauSets[tabIdx].slice(fromInfo.cardIndex, tabIdxLen);
                console.log(sliceOfCards)
                setActiveId(sliceOfCards.map(c => c.uniqueId))
             }
             
        } else {
            setActiveId([event?.active?.id as string]);
        }
        

        
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
            <DrawPile activeId={activeId} deck={deck} />
            <WastePile activeId={activeId} deck={deck} />
          </div>

          {/* Foundation piles (4) */}
          <div style={{ display: "flex", gap: "1vw" }}>
            <FoundationPile
              cards={asc1}
              activeId={activeId}
              fpId={"foundation-pile-1"}
            />
            <FoundationPile
              cards={asc2}
              activeId={activeId}
              fpId={"foundation-pile-2"}
            />
            <FoundationPile
              cards={asc3}
              activeId={activeId}
              fpId={"foundation-pile-3"}
            />
            <FoundationPile
              cards={asc4}
              activeId={activeId}
              fpId={"foundation-pile-4"}
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
              cards={deck.tableauSets[idx]}
              idx={idx}
              activeId={activeId}
            />
          ))}
        </div>
      </div>
{/* 
       <DragOverlay>
            {activeId?.length ? (
              <div style={{ position: "relative", width: "8vw" }}>
                {activeId.map((id, index) => {
                  const cardObj = deck.findWhereCardLives(id)?.card;
                  if (!cardObj) return null;
                  return (
                    <div
                      key={id}
                      style={{
                        position: "absolute",
                        top: `${index * 2.5}vh`,
                        width: "100%",
                        zIndex: index,
                      }}
                    >
                      <DraggableCard
                        card={cardObj}
                        context="tableau"
                        isOverLay={true}
                        activeId={activeId}
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}
  </DragOverlay> */}

    </DndContext>
  );
};
