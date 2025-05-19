import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackKnight from "../utils/GameImages/bn.png";
import whiteKnight from "../utils/GameImages/wn.png";

export class BlackKnight extends Piece {
  public pieceColor = PieceColor.BLACK;
  public knightImg = blackKnight;
  constructor() {
    super(PieceNames.KNIGHT, PieceColor.BLACK);
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

export class WhiteKnight extends Piece {
  public pieceColor = PieceColor.WHITE;
  public knightImg = whiteKnight;
  constructor() {
    super(PieceNames.KNIGHT, PieceColor.WHITE);
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
