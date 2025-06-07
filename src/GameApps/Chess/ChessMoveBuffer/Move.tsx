import { MathCoordinate } from "../board/Square";
import { Piece } from "../pieces/Piece";

export interface MoveState {
  from: MathCoordinate;
  to: MathCoordinate;

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
    promotion?: boolean;
    enPassantCapture?: { pondTaken: MathCoordinate };
    castleKing?: {
      rookFrom: MathCoordinate;
      rookTo: MathCoordinate;
      rookPiece: Piece;
    };
    pondDoubleMove?: boolean;
  };
}

export class Move implements MoveState {
  movedPiece: Piece;
  previousMovedPieceState: Piece;
  capturedPiece: Piece | null;
  previousTurn: number;
  currentTurn: number;
  testingMove: boolean;
  special: {
    promotion?: boolean;
    enPassantCapture?: { pondTaken: MathCoordinate };
    castleKing?: {
      rookFrom: MathCoordinate;
      rookTo: MathCoordinate;
      rookPiece: Piece;
    };
    pondDoubleMove?: boolean;
  };
  public from: MathCoordinate;
  public to: MathCoordinate;

  constructor(
    from: MathCoordinate,
    to: MathCoordinate,
    movedPiece: Piece,
    capturedPiece: Piece | null,
    currentTurn: number,
    testingMove?: boolean
  ) {
    this.from = from;
    this.to = to;
    this.movedPiece = movedPiece;
    this.previousMovedPieceState = movedPiece.clone();
    this.capturedPiece = capturedPiece;
    this.currentTurn = currentTurn;
    this.previousTurn = currentTurn - 1;
    this.testingMove = testingMove || false;
    this.special = {
      promotion: undefined,
      enPassantCapture: undefined,
      castleKing: undefined,
      pondDoubleMove: undefined
    };
  }
}
