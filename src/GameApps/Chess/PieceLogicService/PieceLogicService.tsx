// piece logic layer will be a dependency that is injected into the board...
// via the constructor... Maybe a singleton but basically upon usage
// it will determine what squares can be visible to move to
// and what not... it can also determine things like a possible castle,
// check, piece taking piece maybe even that...

// eventually all pieces will just be passed in with a piece type and two coordinates and board maybe and then logic will
// happen this is piece of work in time...
// isolation piece logic as it happens.

import { MathCoordinate, Square } from "../board/Square";
import { isSameSquare, PieceColor, PieceNames } from "../utils/Utils";

export class PieceLogicService {
  public isValue = (obj: any) => !this.IsNullOrUndefined(obj);

  public IsNullOrUndefined = (obj: any) => {
    return obj === null || obj === undefined;
  };

  public pieceIsOtherColor = (fromSquare: Square, toSquare: Square) => {
    const fromPiece = fromSquare?.piece;
    const toPiece = toSquare?.piece;

    // empty square can move there...
    if (toPiece === null) return true;
    // same color meaning making it false
    // but if different colors then true you can move here...
    return !(fromPiece?.pieceColor === toPiece?.pieceColor);
  };

  public pieceIsSameColor = (fromSquare: Square, toSquare: Square) => {
    const fromPiece = fromSquare?.piece;
    const toPiece = toSquare?.piece;

    // empty square can move there...
    if (toPiece === null) return true;
    // same color meaning making it false
    // but if different colors then true you can move here...
    return fromPiece?.pieceColor === toPiece?.pieceColor;
  };

  public canPondDoubleMove = (node: Square, n1: Square, n2: Square) => {
    if (n2 === null || n2 === undefined) return false;

    return (
      node?.piece?.hasPieceMoved() === false &&
      n1?.SquareHasPiece() === false &&
      n2?.SquareHasPiece() === false
    );
  };

  public canPondMoveForwardOneSpace = (node: Square) => {
    if (node === null || node === undefined) return false;

    return node?.SquareHasPiece() === false;
  };

  public canPondTake = (fromNode: Square, toNode: Square) => {
    if (toNode === null || toNode === undefined) return false;

    return toNode?.SquareHasPiece() && this.pieceIsOtherColor(fromNode, toNode);
  };

  public SquareHasPieceAndIsSameColor = (fromNode: Square, toNode: Square) => {
    if (this.IsNullOrUndefined(fromNode) || this.IsNullOrUndefined(toNode))
      return false;

    const hasPiece = toNode.SquareHasPiece();
    const isSameColor = this.pieceIsSameColor(fromNode, toNode);
    return hasPiece && isSameColor;
  };

  public SquareHasPieceAndIsOtherColor = (fromNode: Square, toNode: Square) => {
    if (this.IsNullOrUndefined(fromNode) || this.IsNullOrUndefined(toNode))
      return false;

    const hasPiece = toNode.SquareHasPiece();
    const isOtherColor = this.pieceIsOtherColor(fromNode, toNode);
    return hasPiece && isOtherColor;
  };

  public SquareHasPond = (node: Square) => {
    if (this.IsNullOrUndefined(node)) return false;

    return node.SquareHasPiece() && node.piece?.pieceName === PieceNames.POND;
  };

  public SquaresHavePondsAreDifferentColors = (n1: Square, n2: Square) => {
    if (this.IsNullOrUndefined(n1) || this.IsNullOrUndefined(n2)) return false;

    return (
      this.SquareHasPond(n1) &&
      this.SquareHasPond(n2) &&
      this.SquareHasPieceAndIsOtherColor(n1, n2)
    );
  };

  public doubleSpaceMoveForward = (
    fromNode: Square,
    toNode: Square,
    pieceColor: PieceColor
  ) => {
    const doubleSpaceCoordinate =
      pieceColor === PieceColor.WHITE
        ? [
            fromNode.mathematicalCoordinate[0] + 2,
            fromNode.mathematicalCoordinate[1],
          ]
        : [
            fromNode.mathematicalCoordinate[0] - 2,
            fromNode.mathematicalCoordinate[1],
          ];

    // console.log("double space: ", doubleSpaceCoordinate);
    // console.log("toNode: ", toNode.mathematicalCoordinate);

    return isSameSquare(
      doubleSpaceCoordinate as [number, number],
      toNode.mathematicalCoordinate
    );
  };

  public shouldNotifySquaresLeftAndRightOfEnPassant = (
    fromNode: Square | undefined,
    toNode: Square | undefined
  ) => {
    if (this.IsNullOrUndefined(fromNode) || this.IsNullOrUndefined(toNode))
      return [false, false];

    const fNode = fromNode as Square;
    const tNode = toNode as Square;
    // is fromNode a pond
    // check if piece has not moved yet
    // check if pond move is a doulbe move...

    const squareHasPiece = this.SquareHasPond(fNode);
    //console.log(squareHasPiece);

    const fNodeHasNotMoved = fNode.piece?.hasPieceNotMoved();
    //console.log(fNodeHasNotMoved);

    const doubleSpaceMove = this.doubleSpaceMoveForward(
      fNode,
      tNode,
      fNode?.piece?.pieceColor as PieceColor
    );
    //console.log(doubleSpaceMove);

    // left or right is pond of other color
    const leftNode = toNode?.left;
    const rightNode = toNode?.right;

    const checkLeftForEnPassant =
      squareHasPiece &&
      fNodeHasNotMoved &&
      doubleSpaceMove &&
      this.SquaresHavePondsAreDifferentColors(leftNode as Square, fNode);

    const checkRightForEnPassant =
      squareHasPiece &&
      fNodeHasNotMoved &&
      doubleSpaceMove &&
      this.SquaresHavePondsAreDifferentColors(rightNode as Square, fNode);

    return [checkLeftForEnPassant, checkRightForEnPassant];
  };

  public IsPondMoveForwardRight = (fromNode: Square, toNode: Square) => {
    return fromNode.piece?.IsWhite()
      ? this.IsWhitePondMoveForwardRight(
          fromNode,
          toNode,
          fromNode.forward?.right as Square
        )
      : this.IsBlackPondMoveForwardRight(
          fromNode,
          toNode,
          fromNode.back?.right as Square
        );
  };

  public IsPondMoveForwardLeft = (fromNode: Square, toNode: Square) => {
    return fromNode.piece?.IsWhite()
      ? this.IsWhitePondMoveForwardRight(
          fromNode,
          toNode,
          fromNode.forward?.left as Square
        )
      : this.IsBlackPondMoveForwardRight(
          fromNode,
          toNode,
          fromNode.back?.left as Square
        );
  };

  // new name for this
  public IsWhitePondMoveForwardRight = (
    fromNode: Square,
    toNode: Square,
    newNode: Square
  ) => {
    // const newNode = fromNode?.forward?.right;
    if (this.IsNullOrUndefined(newNode)) return false;

    const newNodeCoordinate = newNode?.mathematicalCoordinate as MathCoordinate;
    const toNodeCoordinate = toNode?.mathematicalCoordinate as MathCoordinate;

    if (
      this.IsNullOrUndefined(newNodeCoordinate) ||
      this.IsNullOrUndefined(toNodeCoordinate)
    )
      return false;

    return isSameSquare(newNodeCoordinate, toNodeCoordinate);
  };

  public IsBlackPondMoveForwardRight = (
    fromNode: Square,
    toNode: Square,
    newNode: Square
  ) => {
    // const newNode = fromNode?.forward?.right;
    if (this.IsNullOrUndefined(newNode)) return false;

    const newNodeCoordinate = newNode?.mathematicalCoordinate as MathCoordinate;
    const toNodeCoordinate = toNode?.mathematicalCoordinate as MathCoordinate;

    if (
      this.IsNullOrUndefined(newNodeCoordinate) ||
      this.IsNullOrUndefined(toNodeCoordinate)
    )
      return false;

    return isSameSquare(newNodeCoordinate, toNodeCoordinate);
  };

  public IsPondDoubleMove = (fromNode: Square, toNode: Square) => {
    return (
      this.SquareHasPond(fromNode) &&
      this.doubleSpaceMoveForward(
        fromNode,
        toNode,
        fromNode.piece?.pieceColor as PieceColor
      )
    );
  };

  public ShouldPondPromote = (node: Square) => {
    return this.SquareHasPond(node)
      ? node.piece?.IsWhite()
        ? node.mathematicalCoordinate[0] === 8
        : node.mathematicalCoordinate[0] === 1
      : false;
  };

  public IsWhiteKing = (node: Square) => {

    if(this.IsNullOrUndefined(node))
      return false;


    return node?.SquareHasPiece() &&
      node?.piece?.ComparePieceType(PieceNames.KING) &&
      node?.piece?.IsWhite();
  };

  public IsBlackKing = (node: Square) => {

    if (this.IsNullOrUndefined(node))
      return false;

    return node?.SquareHasPiece() &&
      node?.piece?.ComparePieceType(PieceNames.KING) &&
      node?.piece?.IsBlack();
  };

  public Check = (
    opposingPlayersAttackingSquares: Square[],
    checkingFor: PieceColor
  ) => {
    return checkingFor === PieceColor.WHITE
      ? opposingPlayersAttackingSquares.some((sq) => this.IsBlackKing(sq))
      : opposingPlayersAttackingSquares.some((sq) => this.IsWhiteKing(sq));
  };

  public CheckMate = () => {};
}
