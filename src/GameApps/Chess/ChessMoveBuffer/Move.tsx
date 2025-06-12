import { MathCoordinate } from "../board/Square";
import { Piece } from "../pieces/Piece";

export interface MoveState {
  from: MathCoordinate;
  to: MathCoordinate;
  IsPond: boolean;
  previousFiftyMoveStepCounter: number;
  movedPiece: Piece;
  previousMovedPieceState: Piece;
  capturedPiece: Piece | null | undefined;

  previousTurn: number;
  currentTurn: number;

  // default to false this is when I'm
  // making moves but testing for check or check mate
  // or any other type of special move.
  testingMove: boolean;

  special: {
    promotion?: {onSquareWhenPromoted: MathCoordinate; piecePromotedTo?: Piece; pieceThatWas?: Piece; };
    enPassantCapture?: { pondTaken: MathCoordinate; pondTakenPiece: Piece;  };
    castleKing?: {
      rookFrom: MathCoordinate;
      rookTo: MathCoordinate;
      rookPiece: Piece;
    };
    pondDoubleMove?: boolean;
  };
}