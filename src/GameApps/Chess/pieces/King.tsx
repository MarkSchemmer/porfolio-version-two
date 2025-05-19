import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackKing from "../utils/GameImages/bk.png";
import whiteKing from "../utils/GameImages/wk.png";

export class BlackKing extends Piece {
  public pieceColor = PieceColor.BLACK;
  public kingImg = blackKing;
  constructor() {
    super(PieceNames.KING, PieceColor.BLACK);
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

export class WhiteKing extends Piece {
  public pieceColor = PieceColor.WHITE;
  public kingImg = whiteKing;
  constructor() {
    super(PieceNames.KING, PieceColor.WHITE);
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
