/*
    Shared types, and pure methods. 

    To avoid the issues of dealing with classes and types performing in their Typescript way. 
*/

import { Board } from "../board/Board";
import { MathCoordinate, Square } from "../board/Square";
import { PieceLogicService } from "../PieceLogicService/PieceLogicService";
import { BlackBishop, WhiteBishop } from "../pieces/Bishop";
import { BlackKing, WhiteKing } from "../pieces/King";
import { BlackKnight, WhiteKnight } from "../pieces/Knight";
import { Piece } from "../pieces/Piece";
import { BlackPond, WhitePond } from "../pieces/Pond";
import { BlackQueen, WhiteQueen } from "../pieces/Queen";
import { BlackRook, WhiteRook } from "../pieces/Rook";
import { DirectionCrawl, NodeCrawler } from "./NodeMutatorCrawler";

export const isNullOrUndefined = (obj: any) =>
  obj === null || obj === undefined;
export const isValue = (obj: any) => !isNullOrUndefined(obj);

export enum PieceNames {
  POND = "POND",
  ROOK = "ROOK",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  QUEEN = "QUEEN",
  KING = "KING",
}

export enum PieceColor {
  BLACK = "BLACK",
  WHITE = "WHITE",
}

export enum letterCoordinate {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
}

export const letterCoordinateValueMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
};

export const coordinateToLetterValueMap = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h",
};

export type currentSelectedChessSquare = {
  coordinate: MathCoordinate;
  piece: Piece;
};

// Begin chess control buttons

export const cleanBoard = () => {
  return new Board();
};

export const generateCastleScenario = () => {
  const chessBaord = new Board();
  // set ponds a2 -> h2
  Array(8)
    .fill(0)
    .map((_, idx) => {
      return idx + 1;
    })
    .forEach((y) => {
      chessBaord.populateSquareWithPiece([2, y], new WhitePond());
      chessBaord.populateSquareWithPiece([7, y], new BlackPond());
    });

  // set White Rooks
  [
    [1, 1],
    [1, 8],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new WhiteRook());
  });

  // set White King
  chessBaord.populateSquareWithPiece([1, 5], new WhiteKing());

  // set Black Rooks
  [
    [8, 1],
    [8, 8],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new BlackRook());
  });

  // set Black King
  chessBaord.populateSquareWithPiece([8, 5], new BlackKing());

  return chessBaord;
};

export const generateStandardBoard = () => {
  const chessBaord = new Board();
  // set ponds a2 -> h2
  Array(8)
    .fill(0)
    .map((_, idx) => {
      return idx + 1;
    })
    .forEach((y) => {
      chessBaord.populateSquareWithPiece([2, y], new WhitePond());
      chessBaord.populateSquareWithPiece([7, y], new BlackPond());
    });

  // set White Rooks
  [
    [1, 1],
    [1, 8],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new WhiteRook());
  });

  // set White Knights
  [
    [1, 2],
    [1, 7],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new WhiteKnight());
  });

  // set White Bishops
  [
    [1, 3],
    [1, 6],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new WhiteBishop());
  });

  // set White Queen
  chessBaord.populateSquareWithPiece([1, 4], new WhiteQueen());

  // set White King
  chessBaord.populateSquareWithPiece([1, 5], new WhiteKing());

  // set Black Rooks
  [
    [8, 1],
    [8, 8],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new BlackRook());
  });

  // set Black Knights
  [
    [8, 2],
    [8, 7],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new BlackKnight());
  });

  // set Black Bishops
  [
    [8, 3],
    [8, 6],
  ].forEach(([x, y]) => {
    chessBaord.populateSquareWithPiece([x, y], new BlackBishop());
  });

  // set Black Queen
  chessBaord.populateSquareWithPiece([8, 4], new BlackQueen());

  // set Black King
  chessBaord.populateSquareWithPiece([8, 5], new BlackKing());

  return chessBaord;
};

/*

  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService,
  turn: number


*/

// this needs to work in a system of a cache
// and there needs to be a mechanism that needs
// store and to update the board cache and a board is: Square[][]
// so we store the board with all possible moves...
// How should we store all the moves then
export const getLegalAttackMovesForPieceFactory = (
  node: Square,
  logic: PieceLogicService,
  turn: number,
  board: Square[][]
) => {
  const piece = node?.piece as Piece;
  const color = node?.piece?.pieceColor as PieceColor;
  // console.log("I'm finding legal moves for ", color);
  const isWhite = color === PieceColor.WHITE;
  // console.log(piece.pieceName);
  switch (piece.pieceName) {
    case PieceNames.POND: {
      return isWhite
        ? getWhitePondMoves(node, logic, turn)
        : getBlackPondMoves(node, logic, turn);
    }
    case PieceNames.KNIGHT: {
      return getKnightMoves(node);
    }
    case PieceNames.BISHOP: {
      return getBishopMoves(node, logic);
    }
    case PieceNames.ROOK: {
      return getRookMoves(node, logic);
    }
    case PieceNames.QUEEN: {
      return getQueenMoves(node, logic);
    }
    case PieceNames.KING: {
      // console.log("legal Kings moves");
      return getKingMoves(node, board, turn);
    }
    default: {
      return [];
    }
  }
};

// End chess control buttons
export const PieceFactory = (piece: PieceNames, color: PieceColor) => {
  const isWhite = color === PieceColor.WHITE;
  switch (piece) {
    case PieceNames.POND: {
      return isWhite ? new WhitePond() : new BlackPond();
    }
    case PieceNames.KNIGHT: {
      return isWhite ? new WhiteKnight() : new BlackKnight();
    }
    case PieceNames.BISHOP: {
      return isWhite ? new WhiteBishop() : new BlackBishop();
    }
    case PieceNames.ROOK: {
      return isWhite ? new WhiteRook() : new BlackRook();
    }
    case PieceNames.QUEEN: {
      return isWhite ? new WhiteQueen() : new BlackQueen();
    }
    case PieceNames.KING: {
      return isWhite ? new WhiteKing() : new BlackKing();
    }
    default: {
      return null;
    }
  }
};

export const HandleSquareClickWithPiece = (
  coordinate: MathCoordinate,
  chessBoard: Board
) => {
  const node = getNode(coordinate, chessBoard.board);
  const pieceName = node?.piece?.pieceName;
  const pieceColor = node?.piece?.pieceColor;

  switch (pieceName) {
    case PieceNames.POND: {
      chessBoard.clearBoardBgColor();

      if (pieceColor === PieceColor.BLACK) {
        // black moves
        chessBoard.updatePondMovesBlack(coordinate);
      } else {
        // white moves
        chessBoard.updatePondMovesWhite(coordinate);
      }

      return chessBoard;
    }
    case PieceNames.KNIGHT: {
      chessBoard.clearBoardBgColor();
      chessBoard.updateKnightMoves(coordinate);
      return chessBoard;
    }
    case PieceNames.BISHOP: {
      chessBoard.clearBoardBgColor();
      chessBoard.updateBishopMoves(coordinate);
      return chessBoard;
    }
    case PieceNames.ROOK: {
      chessBoard.clearBoardBgColor();
      chessBoard.updateRookMoves(coordinate);
      return chessBoard;
    }
    case PieceNames.QUEEN: {
      chessBoard.clearBoardBgColor();
      chessBoard.updateQueenMoves(coordinate);
      return chessBoard;
    }
    case PieceNames.KING: {
      // need to implement king moves later on in the game.
      chessBoard.clearBoardBgColor();
      chessBoard.updateKingMoves(coordinate);
      return chessBoard;
    }
    default: {
      // log and forget
      return chessBoard;
    }
  }
};

export const clearBoard = (chessBoard: any) => {
  chessBoard.clearBoardBgColor();
  return chessBoard;
};

export const isSameSquare = (c1: [number, number], c2: [number, number]) => {
  const [c1x, c1y] = c1,
    [c2x, c2y] = c2;
  return c1x === c2x && c1y === c2y;
};

export const generateBoardOfSquares = (): Square[][] => {
  let res = Object.entries(letterCoordinateValueMap)
    .reverse()
    .map(([key, value]) => {
      return Array(8)
        .fill(0)
        .map((_, i) => new Square([value, i + 1]));
    });

  //console.log(res);
  return res;
};

export const getNode = (
  [x, y]: MathCoordinate,
  board: Square[][]
): Square | undefined => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = board[row][col];
      const [sqX, sqY] = sq.mathematicalCoordinate;
      if (x === sqX && y === sqY) {
        return sq;
      }
    }
  }
  return undefined;
};

// This will go right ->
// Then when it hits max it go to basically the start and increment x
// left to right
// bottom to top is the movement of the square node.
export const incrementSquareNode = (sq: Square) => {};

// connect left to right helper
const connectLToR = (board: Square[][], rootNode: Square) => {
  // break guard
  if (rootNode === null || rootNode === undefined) {
    return;
  }
  // connecting 1-1 to 1-8
  // connecting only one line  left to right.
  const [rootX, rootY] = rootNode.mathematicalCoordinate;
  let nextNode = getNode([rootX, rootY + 1], board);

  if (nextNode) {
    if (isNullOrUndefined(rootNode.right)) rootNode.right = nextNode;
    if (isNullOrUndefined(nextNode.left)) nextNode.left = rootNode;
    connectLToR(board, nextNode);
  }
};

// connect bottom to top helper
const connectBToT = (board: Square[][], rootNode: Square) => {
  // break guard
  if (rootNode === null || rootNode === undefined) {
    return;
  }
  // connecting 1-1 to 1-8
  // connecting only one line  left to right.
  const [rootX, rootY] = rootNode.mathematicalCoordinate;
  let nextNode = getNode([rootX + 1, rootY], board);

  if (nextNode) {
    if (isNullOrUndefined(rootNode.forward)) rootNode.forward = nextNode;
    if (isNullOrUndefined(rootNode.back)) nextNode.back = rootNode;
    connectBToT(board, nextNode);
  }
};

// connect diagonal left to diagonal right
const connectDiagLToDiagR = (board: Square[][], rootNode: Square) => {
  // break guard
  if (rootNode === null || rootNode === undefined) {
    return;
  }
  // connecting 1-1 to 1-8
  // connecting only one line  left to right.
  const [rootX, rootY] = rootNode.mathematicalCoordinate;
  let nextNode = getNode([rootX + 1, rootY + 1], board);

  if (nextNode) {
    if (isNullOrUndefined(rootNode.diagonalRight))
      rootNode.diagonalRight = nextNode;
    if (isNullOrUndefined(rootNode.diagonalBackLeft))
      nextNode.diagonalBackLeft = rootNode;
    connectDiagLToDiagR(board, nextNode);
  }
};

// connect diagonal right to diagonal left
// diagonal forward left to backward right
const connectDiagRToDiagL = (board: Square[][], rootNode: Square) => {
  // break guard
  if (rootNode === null || rootNode === undefined) {
    return;
  }
  // connecting 1-1 to 1-8
  // connecting only one line  left to right.
  const [rootX, rootY] = rootNode.mathematicalCoordinate;
  let nextNode = getNode([rootX + 1, rootY - 1], board);

  if (nextNode) {
    // && rootNode.diagonalLeft === undefined && nextNode.diagonalBackRight
    if (isNullOrUndefined(rootNode.diagonalLeft))
      rootNode.diagonalLeft = nextNode;
    if (isNullOrUndefined(rootNode.diagonalBackRight))
      nextNode.diagonalBackRight = rootNode;

    connectDiagRToDiagL(board, nextNode);
  }
};

// connect diagonal right to diagonal left
// diagonal forward left to backward right
const connectDiagLToDiagRBack = (board: Square[][], rootNode: Square) => {
  // break guard
  if (rootNode === null || rootNode === undefined) {
    return;
  }
  // connecting 1-1 to 1-8
  // connecting only one line  left to right.
  const [rootX, rootY] = rootNode.mathematicalCoordinate;
  let nextNode = getNode([rootX - 1, rootY + 1], board);

  if (nextNode) {
    // && rootNode.diagonalLeft === undefined && nextNode.diagonalBackRight
    //if (isNullOrUndefined(rootNode.diagonalBackRight))
    rootNode.diagonalBackRight = nextNode;
    // if (isNullOrUndefined(rootNode.diagonalBackRight))
    nextNode.diagonalLeft = rootNode;

    connectDiagLToDiagRBack(board, nextNode);
  }
};

export const connectAllSquares = (board: Square[][], rootNode: Square) => {
  // connect left to right -> now we can iterate forwards and backwards
  // so for example 1-1 will be all connected with 1-8
  connectLToR(board, rootNode);

  // connecting bottom top
  // so for example 1-1 will be all connected with 8-1
  connectBToT(board, rootNode);

  // connecting diagonals, so 1-1 to 8-8...
  connectDiagLToDiagR(board, rootNode);

  // connecting diagonals from right to left so for example
  // 1-8 to 8-1
  connectDiagRToDiagL(board, rootNode);

  connectDiagLToDiagRBack(board, rootNode);
};

// NOT being used in actual chess game now
// Refer to NodeCrawler
// I can add a layer of chess rules to determine if we can get that square.
// and the pieces themselves can use these methods for finding next moves ect.
export const getHorizontalRightRow = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const originalNode = node;

  while (node?.right) {
    if (node === undefined || node === null) {
      return squares;
    }
    // test if forward square has a piece
    // if it does and it's the same color
    // break the function and return what we have
    const hasPiece = node?.right.SquareHasPiece();
    // console.log('has piece', hasPiece);
    const isSameColor = logic.pieceIsSameColor(
      originalNode as Square,
      node?.right as Square
    );
    // console.log('is same color', isSameColor);
    const isOtherColor = logic.pieceIsOtherColor(
      originalNode as Square,
      node?.right as Square
    );
    // console.log(isOtherColor);

    if (hasPiece && isSameColor) {
      return squares;
    }

    // account for if piece is black we just take that one and then end the logic loop.
    if (hasPiece && isOtherColor) {
      return [...squares, node, node?.right];
    }

    node = node?.right;
    squares = [...squares, node];
  }

  return squares;
};

// NOT being used in actual chess game now
// Refer to NodeCrawler
export const getHorizontalLeftRow = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const originalNode = node;

  while (node?.left) {
    if (node === undefined || node === null) {
      return squares;
    }
    // test if forward square has a piece
    // if it does and it's the same color
    // break the function and return what we have
    const hasPiece = node?.left?.SquareHasPiece();
    // console.log('has piece', hasPiece);
    const isSameColor = logic.pieceIsSameColor(
      originalNode as Square,
      node?.left as Square
    );
    // console.log('is same color', isSameColor);
    const isOtherColor = logic.pieceIsOtherColor(
      originalNode as Square,
      node?.left as Square
    );
    // console.log(isOtherColor);

    if (hasPiece && isSameColor) {
      return squares;
    }

    // account for if piece is black we just take that one and then end the logic loop.
    if (hasPiece && isOtherColor) {
      return [...squares, node, node?.left];
    }

    node = node?.left;
    squares = [...squares, node];
  }

  return squares;
};

export const getHorizontalRow = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const rightRow = getHorizontalRightRow(node, [], logic);
  const leftRow = getHorizontalLeftRow(node, [], logic);
  return [...leftRow, node, ...rightRow];
};

// NOT being used in actual chess game now
// Refer to NodeCrawler
// I can add a layer of chess rules to determine if we can get that square.
// and the pieces themselves can use these methods for finding next moves ect.
// currently this is working need to get the other methods working as such...
export const getVerticalForwardColumn = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const originalNode = node;

  while (node?.forward) {
    if (node === undefined || node === null) {
      return squares;
    }
    // test if forward square has a piece
    // if it does and it's the same color
    // break the function and return what we have
    const hasPiece = node?.forward?.SquareHasPiece();
    // console.log('has piece', hasPiece);

    const isSameColor = logic.pieceIsSameColor(
      originalNode as Square,
      node?.forward as Square
    );
    // console.log('is same color', isSameColor);

    const isOtherColor = logic.pieceIsOtherColor(
      originalNode as Square,
      node?.forward as Square
    );
    // console.log(isOtherColor);

    if (hasPiece && isSameColor) {
      return squares;
    }

    // account for if piece is black we just take that one and then end the logic loop.
    if (hasPiece && isOtherColor) {
      return [...squares, node, node?.forward];
    }

    node = node?.forward;
    squares = [...squares, node];
  }

  return squares;
};

// NOT being used in actual chess game now
// Refer to NodeCrawler
export const getVerticalBackColumn = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const originalNode = node;

  while (node?.back) {
    if (node === undefined || node === null) {
      return squares;
    }
    // test if forward square has a piece
    // if it does and it's the same color
    // break the function and return what we have
    const hasPiece = node?.back?.SquareHasPiece();
    // console.log('has piece', hasPiece);

    const isSameColor = logic.pieceIsSameColor(
      originalNode as Square,
      node?.back as Square
    );
    // console.log('is same color', isSameColor);

    const isOtherColor = logic.pieceIsOtherColor(
      originalNode as Square,
      node?.back as Square
    );
    // console.log(isOtherColor);

    if (hasPiece && isSameColor) {
      return squares;
    }

    // account for if piece is black we just take that one and then end the logic loop.
    if (hasPiece && isOtherColor) {
      return [...squares, node, node?.back];
    }

    node = node?.back;
    squares = [...squares, node];
  }

  return squares;
};

export const getVerticalRow = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService
): any => {
  const forwardRow = getVerticalForwardColumn(node, [], logic);
  const backwardRow = getVerticalBackColumn(node, [], logic);
  return [...forwardRow, node, ...backwardRow];
};

export const getDiagonalLeftToRight = (
  node: Square | undefined,
  squares: Square[]
): any => {
  return node === undefined
    ? squares
    : getDiagonalLeftToRight(node.diagonalRight, [...squares, node]);
};

export const getDiagonalLeftToRightBack = (
  node: Square | undefined,
  squares: Square[]
): any => {
  return node === undefined
    ? squares
    : getDiagonalLeftToRightBack(node.diagonalBackRight, [...squares, node]);
};

export const getDiagonalRightToLeft = (
  node: Square | undefined,
  squares: Square[]
): any => {
  return node === undefined
    ? squares
    : getDiagonalRightToLeft(node.diagonalLeft, [...squares, node]);
};

export const getDiagonalRightToLeftBack = (
  node: Square | undefined,
  squares: Square[]
): any => {
  return node === undefined
    ? squares
    : getDiagonalRightToLeftBack(node.diagonalBackLeft, [...squares, node]);
};

// Bishop moves
export const getBishopMoves = (
  node: Square | undefined,
  logic: PieceLogicService
): any => {
  const rightDiag = NodeCrawler(node, logic, DirectionCrawl.diagonalRight);
  const rightDiagBack = NodeCrawler(
    node,
    logic,
    DirectionCrawl.diagonalBackRight
  );

  const leftDiag = NodeCrawler(node, logic, DirectionCrawl.diagonalLeft);
  const leftDiagBack = NodeCrawler(
    node,
    logic,
    DirectionCrawl.diagonalBackLeft
  );

  return [...leftDiagBack, ...leftDiag, ...rightDiag, ...rightDiagBack];
};

// Rook moves.
export const getRookMoves = (
  node: Square | undefined,
  logic: PieceLogicService
): any => {
  const forwardRow = NodeCrawler(node, logic, DirectionCrawl.forward);
  const backwardRow = NodeCrawler(node, logic, DirectionCrawl.back);
  const rightRow = NodeCrawler(node, logic, DirectionCrawl.right);
  const leftRow = NodeCrawler(node, logic, DirectionCrawl.left);
  return [...forwardRow, ...backwardRow, ...rightRow, ...leftRow];
};

// Queen moves
export const getQueenMoves = (
  node: Square | undefined,
  logic: PieceLogicService
): any => {
  const pieceLogic = new PieceLogicService();
  let horzAndVertMoves = getRookMoves(node, logic);
  let diagMoves = getBishopMoves(node, logic);

  let allMovesWithoutNode = [...diagMoves, ...horzAndVertMoves]
    .filter((sq: Square) => {
      const [x, y] = sq.mathematicalCoordinate;
      return (
        (x === node?.mathematicalCoordinate[0] &&
          y === node?.mathematicalCoordinate[1]) === false
      );
    })
    .filter((sq: Square | undefined) => isValue(sq))
    .filter((sq: Square | undefined) =>
      pieceLogic.pieceIsOtherColor(node as Square, sq as Square)
    );

  return allMovesWithoutNode;
};

// Knight moves
export const getKnightMoves = (node: Square | undefined): any => {
  const pieceLogic = new PieceLogicService();

  let tpL = node?.forward?.forward?.left;
  let tpR = node?.forward?.forward?.right;

  let ltp = node?.left?.left?.forward;
  let lbtm = node?.left?.left?.back;

  let bl = node?.back?.back?.left;
  let br = node?.back?.back?.right;

  let rtp = node?.right?.right?.forward;
  let rbtm = node?.right?.right?.back;

  return [tpL, tpR, ltp, lbtm, bl, br, rtp, rbtm]
    .filter((sq: Square | undefined) => isValue(sq))
    .filter((sq: Square | undefined) =>
      pieceLogic.pieceIsOtherColor(node as Square, sq as Square)
    );
};

export const getBlackPondMoves = (
  node: Square | undefined,
  logic: PieceLogicService,
  turn: number
): any => {
  let bn = logic.canPondMoveForwardOneSpace(node?.back as Square)
    ? node?.back
    : null;

  let bnn = logic.canPondDoubleMove(
    node as Square,
    node?.back as Square,
    node?.back?.back as Square
  )
    ? node?.back?.back
    : null;

  let bl = node?.back?.left;
  let br = node?.back?.right;

  const pondMoves = [bn, bnn].filter((sq) => isValue(sq));

  const canMoveLeftOrRight = [bl, br]
    .filter((sq) => isValue(sq))
    .filter((sq) => logic.canPondTake(node as Square, sq as Square));

  let enPassantMoves = [];
  let rightNode = node?.right;
  let leftNode = node?.left;

  //console.log(node?.piece?.enPassantDetails);
  //console.log(turn);

  if (
    node?.piece?.enPassantDetails.CanEnPassant &&
    node?.piece.enPassantDetails.turn === turn &&
    (rightNode?.piece?.pondDoubleMoveTurn || -1) + 1 ===
      node?.piece.enPassantDetails.turn &&
    logic.SquaresHavePondsAreDifferentColors(
      node as Square,
      rightNode as Square
    ) &&
    logic.isValue(br)
  ) {
    let squareToTake = br as Square;
    squareToTake.IsEnPassantMove = true;
    enPassantMoves.push(squareToTake);
  }

  if (
    node?.piece?.enPassantDetails.CanEnPassant &&
    node?.piece.enPassantDetails.turn === turn &&
    (leftNode?.piece?.pondDoubleMoveTurn || -1) + 1 ===
      node?.piece.enPassantDetails.turn &&
    logic.SquaresHavePondsAreDifferentColors(
      node as Square,
      leftNode as Square
    ) &&
    logic.isValue(bl)
  ) {
    let squareToTake = bl as Square;
    squareToTake.IsEnPassantMove = true;
    enPassantMoves.push(squareToTake);
  }

  return [...pondMoves, ...canMoveLeftOrRight, ...enPassantMoves];
};

export const getWhitePondMoves = (
  node: Square | undefined,
  logic: PieceLogicService,
  turn: number
): any => {
  let fn = logic.canPondMoveForwardOneSpace(node?.forward as Square)
    ? node?.forward
    : null;

  // we can only move two up on it's first move...
  let fnn = logic.canPondDoubleMove(
    node as Square,
    node?.forward as Square,
    node?.forward?.forward as Square
  )
    ? node?.forward?.forward
    : null;

  let fl = node?.forward?.left;
  let fr = node?.forward?.right;

  const pondMoves = [fn, fnn].filter((sq) => isValue(sq));

  const canMoveLeftOrRight = [fl, fr]
    .filter((sq) => isValue(sq))
    .filter((sq) => logic.canPondTake(node as Square, sq as Square));

  let enPassantMoves = [];
  let rightNode = node?.right;
  let leftNode = node?.left;

  //console.log(node?.piece?.enPassantDetails);
  //console.log(turn);

  if (
    node?.piece?.enPassantDetails.CanEnPassant &&
    node?.piece.enPassantDetails.turn === turn &&
    (rightNode?.piece?.pondDoubleMoveTurn || -1) + 1 ===
      node?.piece.enPassantDetails.turn &&
    logic.SquaresHavePondsAreDifferentColors(
      node as Square,
      rightNode as Square
    ) &&
    logic.isValue(fr)
  ) {
    let squareToTake = fr as Square;
    squareToTake.IsEnPassantMove = true;
    enPassantMoves.push(squareToTake);
  }

  if (
    node?.piece?.enPassantDetails.CanEnPassant &&
    node?.piece.enPassantDetails.turn === turn &&
    (leftNode?.piece?.pondDoubleMoveTurn || -1) + 1 ===
      node?.piece.enPassantDetails.turn &&
    logic.SquaresHavePondsAreDifferentColors(
      node as Square,
      leftNode as Square
    ) &&
    logic.isValue(fl)
  ) {
    let squareToTake = fl as Square;
    squareToTake.IsEnPassantMove = true;
    enPassantMoves.push(squareToTake);
  }

  return [...pondMoves, ...canMoveLeftOrRight, ...enPassantMoves];
};

export const getKingMoves = (
  node: Square | undefined,
  clonedBoard: Square[][],
  turn: number
): any => {
  const pieceLogic = new PieceLogicService();

  let f = node?.forward;
  let l = node?.left;
  let r = node?.right;
  let b = node?.back;

  let fl = node?.forward?.left;
  let fr = node?.forward?.right;

  let bl = node?.back?.left;
  let br = node?.back?.right;

  const moves = [f, l, r, b, fl, fr, bl, br]
    .filter((sq) => isValue(sq))
    .filter((sq: Square | undefined) =>
      pieceLogic.pieceIsOtherColor(node as Square, sq as Square)
    );

  // const canCastleLeft = pieceLogic.CanWhiteCastleLeft(node as Square, pieceLogic.GetWhiteLeftRook(clonedBoard) as Square, clonedBoard, turn);

  // if (canCastleLeft) {
  //   moves.push(node?.left?.left);
  // }

  return moves;
};

export const getKingMovesSpecialWhite = (
  node: Square | undefined,
  clonedBoard: Square[][],
  turn: number
): any => {
  const pieceLogic = new PieceLogicService();

  let moves: Square[] = [];

  const canCastleLeft = pieceLogic.CanWhiteCastleLeft(
    node as Square,
    pieceLogic.GetWhiteLeftRook(clonedBoard) as Square,
    clonedBoard,
    turn
  );

  if (canCastleLeft) {
    moves.push(node?.left?.left as Square);
  }

  const canCastleRight = pieceLogic.CanWhiteCastleRight(
    node as Square,
    pieceLogic.GetWhiteRightRook(clonedBoard) as Square,
    clonedBoard,
    turn
  );

  if (canCastleRight) {
    moves.push(node?.right?.right as Square);
  }

  return moves;
};

export const getKingMovesSpecialBlack = (
  node: Square | undefined,
  clonedBoard: Square[][],
  turn: number
): any => {
  const pieceLogic = new PieceLogicService();

  let moves: Square[] = [];

  const canCastleLeft = pieceLogic.CanBlackCastleLeft(
    node as Square,
    pieceLogic.GetBlackLeftRook(clonedBoard) as Square,
    clonedBoard,
    turn
  );

  if (canCastleLeft) {
    moves.push(node?.left?.left as Square);
  }

  const canCastleRight = pieceLogic.CanBlackCastleRight(
    node as Square,
    pieceLogic.GetWhiteRightRook(clonedBoard) as Square,
    clonedBoard,
    turn
  );

  if (canCastleRight) {
    moves.push(node?.right?.right as Square);
  }

  return moves;
};

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
