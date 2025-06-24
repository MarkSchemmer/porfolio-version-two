import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackBishop from "../utils/GameImages/bb.png";
import whiteBishop from "../utils/GameImages/wb.png";

export class BlackBishop extends Piece {
  public pieceColor = PieceColor.BLACK;
  public bishopImg = blackBishop;
  constructor() {
    super(PieceNames.BISHOP, PieceColor.BLACK);
  }

  public draw = () => {
    return (
      <img style={this.pieceDisplayStyleProperties} src={this.bishopImg} />
    );
  };
}

export class WhiteBishop extends Piece {
  public pieceColor = PieceColor.WHITE;
  public bishopImg = whiteBishop;
  constructor() {
    super(PieceNames.BISHOP, PieceColor.WHITE);
  }

  public draw = () => {
    return (
      <img style={this.pieceDisplayStyleProperties} src={this.bishopImg} />
    );
  };
}
