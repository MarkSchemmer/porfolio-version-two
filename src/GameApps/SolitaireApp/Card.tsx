import { CardBaseColor, Suits } from "./utils/Utils";

import React from "react";
import { CSS } from "@dnd-kit/utilities";

import { useDraggable } from "@dnd-kit/core";
import { cardImages } from "./utils/Utils";

export class Card {
  public showing: boolean = false;
  public cardImg: string;
  public backgroundImg: string = cardImages.backGroundImage;
  public suit: Suits;
  public baseColor: CardBaseColor;
  public cardWeight: number;
  public uniqueId: string;

  constructor(
    cardImg: string,
    suit: Suits,
    baseColor: CardBaseColor,
    cardWeight: number,
    showing: boolean = false
  ) {
    this.showing = showing;
    this.cardImg = cardImg;
    this.suit = suit;
    this.baseColor = baseColor;
    this.cardWeight = cardWeight;
    this.uniqueId = `${this.suit}-${this.cardWeight}-${this.baseColor}`;
  }

  public makeShow = () => {
    this.showing = true;
  };

  public makeHidden = () => {
    this.showing = false;
  };

  public IsIncomingCardMore = (incomingCard: Card) => {
    // check if current card is ace...

    const currentCardAce = this.IsAce();

    if (currentCardAce) {
      return incomingCard.cardWeight === 2;
    } else {
      return this.cardWeight + 1 === incomingCard.cardWeight;
    }
  }

  public IsIncomingCardLess = (incomingCard: Card) => {
    return this.cardWeight - 1 === incomingCard.cardWeight;
  };

  public IsIncomingCardOppositeColor = (incomingCard: Card) => {
    return this.baseColor !== incomingCard.baseColor;
  };

  public IsIncomingCardSameSuite = (incomingCard: Card) => {
    return this.suit === incomingCard.suit;
  };

  public canStackOnTableau = (incomingCard: Card) => {
    return (
      this.IsIncomingCardLess(incomingCard) &&
      this.IsIncomingCardOppositeColor(incomingCard)
    );
  };

  public canStackOnFoundation = (incomingCard: Card) => {
    return (
      this.IsIncomingCardMore(incomingCard) &&
      this.IsIncomingCardSameSuite(incomingCard)
    );
  };

  public IsKing = () => {
    return this.cardWeight === 13;
  };

  public IsAce = () => {
    return this.cardWeight === 14;
  };

  public draw = (
    context: "foundation" | "draw" | "waste" | "tableau" | "lastCardOnWaste",
    id: string,
    activeId?: string | null
  ) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });

    const isDragging = activeId === id;
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
      context === "waste" || this.showing === false ? (
        <div ref={setNodeRef} style={style}>
          <img
            src={this.showing ? this.cardImg : this.backgroundImg}
            alt={`card-${this.suit}${this.cardWeight}`}
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
            src={this.showing ? this.cardImg : this.backgroundImg}
            alt={`card-${this.suit}${this.cardWeight}`}
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
}
