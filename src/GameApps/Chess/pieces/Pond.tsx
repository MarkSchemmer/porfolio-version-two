import { PieceColor, PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackPond from "../utils/GameImages/bp.png";
import whitePond from "../utils/GameImages/wp.png";

class Pond extends Piece {
  constructor() {
    super(PieceNames.POND.toString());
  }
}

export class BlackPond extends Pond {
  public pieceColor = PieceColor.BLACK;
  public pondImg = blackPond;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.pondImg}
      />
    );
  };
}

export class WhitePond extends Pond {
  public pieceColor = PieceColor.WHITE;
  public pondImg = whitePond;
  constructor() {
    super();
  }

  public draw = () => {
    return (
      <img
        style={{ height: "75px", marginLeft: "12px", marginTop: "5px" }}
        src={this.pondImg}
      />
    );
  };
}

// Export these to another file further down maybe even name it
// BoxPieces for menu or something to those line of thinking.
// export pond, rook, bishop, queen and king
