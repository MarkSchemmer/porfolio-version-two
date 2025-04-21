import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackBishop from "../utils/GameImages/bb.png";
import whiteBishop from "../utils/GameImages/wb.png";

class Bishop extends Piece {
  constructor() {
    super(PieceNames.BISHOP.toString());
  }
}

export class BlackBishop extends Bishop {
  public pieceColor = PieceColor.BLACK;
  public bishopImg = blackBishop;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.bishopImg}
      />
    );
  };
}

export class WhiteBishop extends Bishop {
  public pieceColor = PieceColor.WHITE;
  public bishopImg = whiteBishop;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.bishopImg}
      />
    );
  };
}
