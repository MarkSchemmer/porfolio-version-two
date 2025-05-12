import { PieceColor, PieceNames } from "../utils/Utils";
import { EnPassantDetails, Piece } from "./Piece";
import blackPond from "../utils/GameImages/bp.png";
import whitePond from "../utils/GameImages/wp.png";



export class BlackPond extends Piece {
  public pieceColor = PieceColor.BLACK;
  public pondImg = blackPond;

  public enPassantDetails: EnPassantDetails = {
    turn: 0, CanEnPassant: false
  }

  constructor() {
    super(PieceNames.POND.toString(), PieceColor.BLACK);
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

export class WhitePond extends Piece {
  public pieceColor = PieceColor.WHITE;
  public pondImg = whitePond;

  public enPassantDetails: EnPassantDetails = {
    turn: 0, CanEnPassant: false
  }

  constructor() {
    super(PieceNames.POND.toString(), PieceColor.WHITE);
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
