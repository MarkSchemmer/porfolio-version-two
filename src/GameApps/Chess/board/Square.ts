/*
    Create an algorithm for generating the board and giving each square a coordinate. 

    Find a algorithm for splitting all squares into 8. 

    Then render all squares with mathematical coordinate
*/

import { Piece } from "../pieces/Piece";
import { uuidv4 } from "../utils/Utils";

export type MathCoordinate = [number, number];

export class Square {
  public id = uuidv4();

  public possiblePieceMove: boolean = false;

  public left?: Square;
  public right?: Square;
  public forward?: Square;
  public back?: Square;
  public diagonalLeft?: Square;
  public diagonalRight?: Square;
  public diagonalBackLeft?: Square;
  public diagonalBackRight?: Square;

  public mathematicalCoordinate: MathCoordinate;

  public IsEnPassantMove: boolean = false;

  public piece: Piece | null | undefined = null;

  // Testing props will be commented out later.
  // Do not use.
  public SquareBgColor: string = "none";

  constructor(mathematicalCoordinate: [number, number]) {
    this.mathematicalCoordinate = mathematicalCoordinate;
  }

  public makeSquareEmpty = () => {
    this.piece = null;
  };

  public SquareHasPiece = (): boolean => {
    return this.piece !== null && this.piece !== undefined;
  };

  public SetNodeWithNewPiece = (piece: Piece | undefined | null) => {
    this.piece = piece;
  };

  public makeSquareMoviable = (bgColor: string) => {
    this.SquareBgColor = bgColor;
    this.possiblePieceMove = true;
  };

  public canMoveHere = (): boolean => this.possiblePieceMove === true;

  public generateDeepClone = (clonedMap = new Map<Square, Square>()): Square => {
    // If we've already cloned this square, return the clone
    if (clonedMap.has(this)) return clonedMap.get(this)!;
  
    // Create a new Square with the same coordinate
    const clone = new Square([...this.mathematicalCoordinate] as [number, number]);
    clonedMap.set(this, clone);
  
    // Clone primitive and simple fields
    clone.id = this.id; // or generate new ID if needed
    clone.possiblePieceMove = this.possiblePieceMove;
    clone.IsEnPassantMove = this.IsEnPassantMove;
    clone.SquareBgColor = this.SquareBgColor;
  
    // Shallow clone or deeply clone the piece as needed
    clone.piece = this.piece ? this.piece.clone?.() ?? this.piece : null;
  
    // Recursively clone neighbor squares
    clone.left = this.left?.generateDeepClone(clonedMap);
    clone.right = this.right?.generateDeepClone(clonedMap);
    clone.forward = this.forward?.generateDeepClone(clonedMap);
    clone.back = this.back?.generateDeepClone(clonedMap);
    clone.diagonalLeft = this.diagonalLeft?.generateDeepClone(clonedMap);
    clone.diagonalRight = this.diagonalRight?.generateDeepClone(clonedMap);
    clone.diagonalBackLeft = this.diagonalBackLeft?.generateDeepClone(clonedMap);
    clone.diagonalBackRight = this.diagonalBackRight?.generateDeepClone(clonedMap);
  
    return clone;
  };
}
