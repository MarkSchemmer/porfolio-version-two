import { CardBaseColor, Suits } from "./utils/Utils";

export class Card {
  public showing: boolean = false;
  public cardImg: string;
  public suit: Suits;
  public baseColor: CardBaseColor;
  public cardWeight: number;

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
  }

  public draw = (context: "foundation" | "draw" | "waste" | "tableau") => {
    const isTall = context === "tableau";

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: isTall ? "120px" : "100%", // fixed height for tableau
          boxSizing: "border-box",
        }}
      >
        <img
          src={this.cardImg}
          alt={`card-${this.suit}${this.cardWeight}`}
          style={{
            width: isTall ? "auto" : "100%", // match width unless in tableau
            height: isTall ? "100%" : "auto", // fill height in tableau
            objectFit: "contain",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
      </div>
    );
  };
}
