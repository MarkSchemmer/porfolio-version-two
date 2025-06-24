import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackQueen from "../utils/GameImages/bq.png";
import whiteQueen from "../utils/GameImages/wq.png";

export class BlackQueen extends Piece {
  public pieceColor = PieceColor.BLACK;
  public queenImg = blackQueen;
  constructor() {
    super(PieceNames.QUEEN, PieceColor.BLACK);
  }

  public draw = () => {
    return <img style={this.pieceDisplayStyleProperties} src={this.queenImg} />;
  };
}

export class WhiteQueen extends Piece {
  public pieceColor = PieceColor.WHITE;
  public queenImg = whiteQueen;
  constructor() {
    super(PieceNames.QUEEN, PieceColor.WHITE);
  }

  public draw = () => {
    return <img style={this.pieceDisplayStyleProperties} src={this.queenImg} />;
  };
}
