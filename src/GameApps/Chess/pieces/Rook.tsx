import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackRook from "../utils/GameImages/br.png";
import whiteRook from "../utils/GameImages/wr.png";

class Rook extends Piece {
  constructor() {
    super(PieceNames.ROOK.toString());
  }
}

export class BlackRook extends Rook {
  public pieceColor = PieceColor.BLACK;
  public rookImg = blackRook;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.rookImg}
      />
    );
  };
}

export class WhiteRook extends Rook {
  public pieceColor = PieceColor.WHITE;
  public rookImg = whiteRook;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.rookImg}
      />
    );
  };
}
