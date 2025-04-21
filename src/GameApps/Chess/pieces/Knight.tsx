import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackKnight from "../utils/GameImages/bn.png";
import whiteKnight from "../utils/GameImages/wn.png";

class Knight extends Piece {
  constructor() {
    super(PieceNames.KNIGHT.toString());
  }
}

export class BlackKnight extends Knight {
  public pieceColor = PieceColor.BLACK;
  public knightImg = blackKnight;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.knightImg}
      />
    );
  };
}

export class WhiteKnight extends Knight {
  public pieceColor = PieceColor.WHITE;
  public knightImg = whiteKnight;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.knightImg}
      />
    );
  };
}
