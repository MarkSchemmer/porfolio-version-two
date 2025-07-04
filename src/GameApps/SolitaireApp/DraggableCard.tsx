import { useDraggable } from "@dnd-kit/core";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getDeck, UpdateDeck } from "../../store/slices/solitaireSlice";
import { Deck, Pile } from "./Deck";
import { table } from "console";

export const DraggableCard = ({
  card,
  context,
  activeId,
  isOverLay = false,
}: {
  card: Card;
  context: "foundation" | "draw" | "waste" | "tableau" | "lastCardOnWaste";
  activeId?: string[] | null;
  isOverLay: boolean;
}) => {
    const deck = useSelector(getDeck) as Deck;
    const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.uniqueId,
  });

  const isDragging = activeId?.some((i) => i === card.uniqueId);
  const isTableau = context === "tableau";

  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    touchAction: "none", // better mobile behavior
    width: "100%",
    height: "100%",
    cursor: "grab",
    position: isDragging ? "absolute" : "relative",
    zIndex: isDragging ? 9999 : "auto",
    pointerEvents: isDragging ? "none" : "auto",
  };

  const finalCard =
    context === "waste" || card.showing === false ? (
      <div ref={setNodeRef} style={style} onClick={() => {

        const fromInfo = deck.findWhereCardLives(card.uniqueId);
        
        if (fromInfo && fromInfo.fromPile === Pile.TABLEAU) {
            const tabLen = fromInfo.pileIndex as number;
            const len = deck.tableauSets[tabLen].length - 1;
            console.log(deck.tableauSets[tabLen][len]);
            if (deck.tableauSets[tabLen][len].uniqueId === card.uniqueId) {
                card.makeShow();
                dispatch(UpdateDeck(deck));
            }
        }

      }}>
        <img
          src={card.showing ? card.cardImg : card.backgroundImg}
          alt={`card-${card.suit}${card.cardWeight}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ) : (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <img
          src={card.showing ? card.cardImg : card.backgroundImg}
          alt={`card-${card.suit}${card.cardWeight}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );

  return finalCard;
};
