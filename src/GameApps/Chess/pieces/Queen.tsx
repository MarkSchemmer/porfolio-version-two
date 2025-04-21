import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackQueen from "../utils/GameImages/bq.png";
import whiteQueen from "../utils/GameImages/wq.png";

class Queen extends Piece {
  constructor() {
    super(PieceNames.QUEEN.toString());
  }
}

export class BlackQueen extends Queen {
  public pieceColor = PieceColor.BLACK;
  public queenImg = blackQueen;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.queenImg}
      />
    );
  };
}

export class WhiteQueen extends Queen {
  public pieceColor = PieceColor.WHITE;
  public queenImg = whiteQueen;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.queenImg}
      />
    );
  };
}
