import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackRook from "../utils/GameImages/br.png";
import whiteRook from "../utils/GameImages/wr.png";

export class BlackRook extends Piece {
  public pieceColor = PieceColor.BLACK;
  public rookImg = blackRook;
  constructor() {
    super(PieceNames.ROOK.toString(), PieceColor.BLACK);
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

export class WhiteRook extends Piece {
  public pieceColor = PieceColor.WHITE;
  public rookImg = whiteRook;
  constructor() {
    super(PieceNames.ROOK.toString(), PieceColor.WHITE);
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
