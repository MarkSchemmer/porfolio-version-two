import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackKing from "../utils/GameImages/bk.png";
import whiteKing from "../utils/GameImages/wk.png";

class King extends Piece {
  constructor() {
    super(PieceNames.KING.toString());
  }
}

export class BlackKing extends King {
  public pieceColor = PieceColor.BLACK;
  public kingImg = blackKing;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.kingImg}
      />
    );
  };
}

export class WhiteKing extends King {
  public pieceColor = PieceColor.WHITE;
  public kingImg = whiteKing;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.kingImg}
      />
    );
  };
}
