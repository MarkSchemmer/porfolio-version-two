// piece logic layer will be a dependency that is injected into the board...
// via the constructor... Maybe a singleton but basically upon usage
// it will determine what squares can be visible to move to
// and what not... it can also determine things like a possible castle,
// check, piece taking piece maybe even that...

// eventually all pieces will just be passed in with a piece type and two coordinates and board maybe and then logic will
// happen this is piece of work in time...
// isolation piece logic as it happens.

import { Board } from "../board/Board";
import { MathCoordinate, Square } from "../board/Square";
import { MoveState } from "../ChessMoveBuffer/Move";
import ChessNotationHelper from "../ChessNotationService/ChessNotationHelper";
import { getNode, isSameSquare, PieceColor, PieceNames } from "../utils/Utils";

/*
    Checkmate we need to get all the pieces of the color that is in check

    I get all possible moves of that color then for each move I simulate in a copy
    of the board not affecting the board 

    Then I check if current player in check is still in check 

    if all possible moves do not remove check then it's checkmate otherwise it's
    just temporary check
*/

export type CheckMate = {
  SquareFrom: Square; // square holding current position of piece in check
  SquareToPossibilities: Square[]; // list of squares piece can move to...
};

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

  public ShouldPondPromoteV2 = (fromNode: Square, toNode: Square) => {
    return this.SquareHasPond(fromNode)
      ? fromNode.piece?.IsWhite()
        ? toNode.mathematicalCoordinate[0] === 8
        : toNode.mathematicalCoordinate[0] === 1
      : false;
  };

  public IsWhiteKing = (node: Square) => {
    if (this.IsNullOrUndefined(node)) return false;

    return (
      node?.SquareHasPiece() &&
      node?.piece?.ComparePieceType(PieceNames.KING) &&
      node?.piece?.IsWhite()
    );
  };

  /*
      --- Castle Logic ---
  */

  public IsWhiteKingAndDoubleMovingLeft = (
    kingSquare: Square,
    toSquare: Square
  ) => {
    const [kx, ky] = kingSquare.mathematicalCoordinate;
    const [tx, ty] = toSquare.mathematicalCoordinate;
    return (
      this.IsWhiteKing(kingSquare) &&
      kx === 1 &&
      ky === 5 &&
      tx === 1 &&
      ty === 3
    );
  };

  public IsWhiteKingAndDoubleMovingRight = (
    kingSquare: Square,
    toSquare: Square
  ) => {
    const [kx, ky] = kingSquare.mathematicalCoordinate;
    const [tx, ty] = toSquare.mathematicalCoordinate;
    return (
      this.IsWhiteKing(kingSquare) &&
      kx === 1 &&
      ky === 5 &&
      tx === 1 &&
      ty === 7
    );
  };

  public IsBlackKingAndDoubleMovingLeft = (
    kingSquare: Square,
    toSquare: Square
  ) => {
    const [kx, ky] = kingSquare.mathematicalCoordinate;
    const [tx, ty] = toSquare.mathematicalCoordinate;
    return (
      this.IsBlackKing(kingSquare) &&
      kx === 8 &&
      ky === 5 &&
      tx === 8 &&
      ty === 3
    );
  };

  public IsBlackKingAndDoubleMovingRight = (
    kingSquare: Square,
    toSquare: Square
  ) => {
    const [kx, ky] = kingSquare.mathematicalCoordinate;
    const [tx, ty] = toSquare.mathematicalCoordinate;
    return (
      this.IsBlackKing(kingSquare) &&
      kx === 8 &&
      ky === 5 &&
      tx === 8 &&
      ty === 7
    );
  };

  public HandleCastleCanMoveLogic = (
    kingSquare: Square,
    toSquare: Square
  ): { from: MathCoordinate; to: MathCoordinate; desc?: any } | null => {
    if (this.IsWhiteKingAndDoubleMovingLeft(kingSquare, toSquare)) {
      return {
        from: [1, 1],
        to: [1, 4],
        desc: ChessNotationHelper.chessNotationSymbols.queenSideCastle,
      };
    }

    if (this.IsWhiteKingAndDoubleMovingRight(kingSquare, toSquare)) {
      return {
        from: [1, 8],
        to: [1, 6],
        desc: ChessNotationHelper.chessNotationSymbols.kingSideCastle,
      };
    }

    if (this.IsBlackKingAndDoubleMovingLeft(kingSquare, toSquare)) {
      return {
        from: [8, 1],
        to: [8, 4],
        desc: ChessNotationHelper.chessNotationSymbols.queenSideCastle,
      };
    }

    if (this.IsBlackKingAndDoubleMovingRight(kingSquare, toSquare)) {
      return {
        from: [8, 8],
        to: [8, 6],
        desc: ChessNotationHelper.chessNotationSymbols.kingSideCastle,
      };
    }

    return null;
  };

  /*
      --- Castle Logic ---
  */

  public IsBlackKing = (node: Square) => {
    if (this.IsNullOrUndefined(node)) return false;

    return (
      node?.SquareHasPiece() &&
      node?.piece?.ComparePieceType(PieceNames.KING) &&
      node?.piece?.IsBlack()
    );
  };

  public Check = (
    opposingPlayersAttackingSquares: Square[],
    checkingFor: PieceColor // player who moved we need to check opposite basically
  ) => {
    return checkingFor === PieceColor.WHITE
      ? opposingPlayersAttackingSquares.some((sq) => this.IsBlackKing(sq))
      : opposingPlayersAttackingSquares.some((sq) => this.IsWhiteKing(sq));
  };

  public CheckTwo = (
    opposingPlayersAttackingSquares: Square[],
    checkingFor: PieceColor // player who moved we need to check opposite basically
  ) => {
    return checkingFor === PieceColor.WHITE
      ? opposingPlayersAttackingSquares.some((sq) => this.IsWhiteKing(sq))
      : opposingPlayersAttackingSquares.some((sq) => this.IsBlackKing(sq));
  };

  /*
    public IsBlackInCheck = (chessBaord: Board) => {
    const { logic, board, GetBlackKing } = chessBaord;
    const node = GetBlackKing(board) as Square;
    const surroundingSquares = [
      node.forward,
      node.back,
      node.left,
      node.right,
      node.forward?.left,
      node.forward?.right,
      node.back?.left,
      node.back?.right,
    ]
      .filter((sq): sq is Square => !!sq)
      .filter((sq) => logic.pieceIsOtherColor(node, sq));
    const whiteAttackingPieces = [
      ...Array.from(chessBaord.whitePieceAndAttacksCache.values()).flat(),
      ...surroundingSquares,
    ];
    const anyAttackingWhitePiecesHaveBlackKing = whiteAttackingPieces.some(
      (sq) => logic.IsBlackKing(sq)
    );
    return anyAttackingWhitePiecesHaveBlackKing;
  };
  */

  public CheckMateBlack = (
    playerWhoIsChecking: PieceColor,
    playerWhoIsInCheck: PieceColor,
    board: Board
  ): boolean => {
    console.log("player who is checking: ", playerWhoIsChecking);
    console.log("player who is checked: ", playerWhoIsInCheck);

    const getAllAttackingSquares = board
      .getAllPossibleMovesOfPlayerInCheck(board.board, playerWhoIsInCheck)
      .filter((cm: CheckMate) => cm.SquareToPossibilities.length > 0);

    const node = board.GetWhiteKing(board.board) as Square;

    const surroundingSquares = [
      node.forward,
      node.back,
      node.left,
      node.right,
      node.forward?.left,
      node.forward?.right,
      node.back?.left,
      node.back?.right,
    ].filter((sq): sq is Square => !!sq);

    getAllAttackingSquares.push({
      SquareFrom: node,
      SquareToPossibilities: surroundingSquares,
    });

    console.log(
      "amount of Legal moves for player in Check: ",
      getAllAttackingSquares
    );

    for (let { SquareToPossibilities, SquareFrom } of getAllAttackingSquares) {
      // mutate the board

      for (let sq of SquareToPossibilities) {
        const move = board.craftMove(
          SquareFrom.mathematicalCoordinate,
          sq.mathematicalCoordinate,
          board,
          true
        );

        board.moveBuffer.recordMove(move);

        board.makeMove(board.moveBuffer.LastMove as MoveState);

        const getAllSquares = board.getAllAttackingMoves(
          board.board,
          playerWhoIsChecking
        );
        let checkRes = this.CheckTwo(getAllSquares, playerWhoIsInCheck);

        let lastMove = board.moveBuffer.deepUndo() as MoveState;
        board.undoMove(lastMove);
        // console.log(checkRes);
        if (checkRes === false) {
          return false;
        }
      }
    }
    return true;
  };

  public CheckMateWhite = (
    playerWhoIsChecking: PieceColor,
    playerWhoIsInCheck: PieceColor,
    board: Board
  ): boolean => {
    console.log("player who is checking: ", playerWhoIsChecking);
    console.log("player who is checked: ", playerWhoIsInCheck);

    const getAllAttackingSquares = board
      .getAllPossibleMovesOfPlayerInCheck(board.board, playerWhoIsInCheck)
      .filter((cm: CheckMate) => cm.SquareToPossibilities.length > 0);

    const node = board.GetBlackKing(board.board) as Square;

    const surroundingSquares = [
      node.forward,
      node.back,
      node.left,
      node.right,
      node.forward?.left,
      node.forward?.right,
      node.back?.left,
      node.back?.right,
    ].filter((sq): sq is Square => !!sq);

    getAllAttackingSquares.push({
      SquareFrom: node,
      SquareToPossibilities: surroundingSquares,
    });

    console.log(
      "amount of Legal moves for player in Check: ",
      getAllAttackingSquares
    );

    for (let { SquareToPossibilities, SquareFrom } of getAllAttackingSquares) {
      // mutate the board

      for (let sq of SquareToPossibilities) {
        const move = board.craftMove(
          SquareFrom.mathematicalCoordinate,
          sq.mathematicalCoordinate,
          board,
          true
        );

        board.moveBuffer.recordMove(move);

        board.makeMove(board.moveBuffer.LastMove as MoveState);

        const getAllSquares = board.getAllAttackingMoves(
          board.board,
          playerWhoIsChecking
        );
        let checkRes = this.CheckTwo(getAllSquares, playerWhoIsInCheck);

        let lastMove = board.moveBuffer.deepUndo() as MoveState;
        board.undoMove(lastMove);
        // console.log(checkRes);
        if (checkRes === false) {
          return false;
        }
      }
    }
    return true;
  };

  public CheckMate = (
    playerWhoIsChecking: PieceColor,
    playerWhoIsInCheck: PieceColor,
    board: Board
  ): boolean => {
    console.log("player who is checking: ", playerWhoIsChecking);
    console.log("player who is checked: ", playerWhoIsInCheck);

    const getAllAttackingSquares = board
      .getAllPossibleMovesOfPlayerInCheck(board.board, playerWhoIsInCheck)
      .filter((cm: CheckMate) => cm.SquareToPossibilities.length > 0);

    console.log(
      "amount of Legal moves for player in Check: ",
      getAllAttackingSquares
    );

    for (let { SquareToPossibilities, SquareFrom } of getAllAttackingSquares) {
      // mutate the board

      for (let sq of SquareToPossibilities) {
        const move = board.craftMove(
          SquareFrom.mathematicalCoordinate,
          sq.mathematicalCoordinate,
          board,
          true
        );

        board.moveBuffer.recordMove(move);

        board.makeMove(board.moveBuffer.LastMove as MoveState);

        const getAllSquares = board.getAllAttackingMoves(
          board.board,
          playerWhoIsChecking
        );
        let checkRes = this.CheckTwo(getAllSquares, playerWhoIsInCheck);

        let lastMove = board.moveBuffer.deepUndo() as MoveState;
        board.undoMove(lastMove);
        // console.log(checkRes);
        if (checkRes === false) {
          return false;
        }
      }
    }
    return true;
  };

  public IsBlackInCheck = (chessBaord: Board) => {
    const { logic, board, GetBlackKing } = chessBaord;
    const node = GetBlackKing(board) as Square;
    const surroundingSquares = [
      node.forward,
      node.back,
      node.left,
      node.right,
      node.forward?.left,
      node.forward?.right,
      node.back?.left,
      node.back?.right,
    ]
      .filter((sq): sq is Square => !!sq)
      .filter((sq) => logic.pieceIsOtherColor(node, sq));
    const whiteAttackingPieces = [
      ...Array.from(chessBaord.whitePieceAndAttacksCache.values()).flat(),
      ...surroundingSquares,
    ];
    const anyAttackingWhitePiecesHaveBlackKing = whiteAttackingPieces.some(
      (sq) => logic.IsBlackKing(sq)
    );
    return anyAttackingWhitePiecesHaveBlackKing;
  };

  public IsWhiteInCheck = (chessBoard: Board) => {
    const { logic, board, GetBlackKing } = chessBoard;
    const node = GetBlackKing(board) as Square;
    const surroundingSquares = [
      node.forward,
      node.back,
      node.left,
      node.right,
      node.forward?.left,
      node.forward?.right,
      node.back?.left,
      node.back?.right,
    ]
      .filter((sq): sq is Square => !!sq)
      .filter((sq) => logic.pieceIsOtherColor(node, sq));
    const blackAttackingPieces = [
      ...Array.from(chessBoard.blackPieceAndAttacksCache.values()).flat(),
      ...surroundingSquares,
    ];
    const anyAttackingBlackPiecesHaveWhiteKing = blackAttackingPieces.some(
      (sq) => logic.IsWhiteKing(sq)
    );
    return anyAttackingBlackPiecesHaveWhiteKing;
  };

  public BlackCheckMatingWhite = (board: Board) => {
    return this.CheckMateBlack(PieceColor.BLACK, PieceColor.WHITE, board);
  };

  public WhiteCheckMatingBlack = (board: Board) => {
    return this.CheckMateWhite(PieceColor.WHITE, PieceColor.BLACK, board);
  };

  public GetWhiteLeftRook = (board: Square[][]) => {
    return getNode([1, 1], board);
  };

  public GetWhiteRightRook = (board: Square[][]) => {
    return getNode([1, 8], board);
  };

  public GetBlackLeftRook = (board: Square[][]) => {
    return getNode([8, 1], board);
  };

  public GetBlackRightRook = (board: Square[][]) => {
    return getNode([8, 8], board);
  };

  public CanBlackCastleLeft = (
    kingNode: Square,
    leftRookNode: Square,
    chessBoard: Board,
    turn: number
  ) => {
    if (
      this.IsNullOrUndefined(kingNode.piece) ||
      this.IsNullOrUndefined(leftRookNode.piece)
    )
      return false;

    const hasKingMoved = kingNode?.piece?.hasMoved === true; // to castle King can't move
    const hasRookMoved = leftRookNode?.piece?.hasMoved === true; // to castle rook can't move either

    if (hasKingMoved || hasRookMoved) return false;

    // there is open space to castle, basically eqch square until the rook is epmpty
    const pathFromKingToRookIsEmpty = [
      kingNode.left,
      kingNode.left?.left,
      kingNode.left?.left?.left,
    ].some((sq) => sq?.SquareHasPiece());

    if (pathFromKingToRookIsEmpty) return false;

    // last check is white can't be in check, and next two moves over left cannot also
    // create a situation of check

    let currentPostionCheck = this.IsBlackInCheck(chessBoard);

    if (currentPostionCheck)
      // can't move if white is in check
      return false;

    // now we simulate two moves and check for each one

    const moveOne = chessBoard.craftMove([8, 5], [8, 4], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveOne);
    chessBoard.makeMove(moveOne);

    currentPostionCheck = this.IsBlackInCheck(chessBoard);

    let lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    const moveTwo = chessBoard.craftMove([8, 4], [8, 3], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveTwo);
    chessBoard.makeMove(moveTwo);

    // [1, 4] -> [1, 3] -> Is in Check
    currentPostionCheck = this.IsBlackInCheck(chessBoard);

    lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    return true;
  };

  public CanBlackCastleRight = (
    kingNode: Square,
    rightRookNode: Square,
    chessBoard: Board,
    turn: number
  ) => {
    if (
      this.IsNullOrUndefined(kingNode.piece) ||
      this.IsNullOrUndefined(rightRookNode.piece)
    )
      return false;

    const hasKingMoved = kingNode?.piece?.hasMoved === true; // to castle King can't move
    const hasRookMoved = rightRookNode?.piece?.hasMoved === true; // to castle rook can't move either

    if (hasKingMoved || hasRookMoved) return false;

    // there is open space to castle, basically eqch square until the rook is epmpty
    const pathFromKingToRookIsEmpty = [
      kingNode.right,
      kingNode.right?.right,
    ].some((sq) => sq?.SquareHasPiece());

    if (pathFromKingToRookIsEmpty) return false;

    // last check is white can't be in check, and next two moves over left cannot also
    // create a situation of check

    let currentPostionCheck = this.IsBlackInCheck(chessBoard);

    if (currentPostionCheck)
      // can't move if white is in check
      return false;

    // now we simulate two moves and check for each one
    const moveOne = chessBoard.craftMove([8, 5], [8, 6], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveOne);
    chessBoard.makeMove(moveOne);

    currentPostionCheck = this.IsBlackInCheck(chessBoard);

    let lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    // [1, 4] -> [1, 3] -> Is in Check
    const moveTwo = chessBoard.craftMove([8, 6], [8, 7], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveTwo);
    chessBoard.makeMove(moveTwo);

    currentPostionCheck = this.IsBlackInCheck(chessBoard);

    lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    return true;
  };

  public CanWhiteCastleLeft = (
    kingNode: Square,
    leftRookNode: Square,
    chessBoard: Board,
    turn: number
  ) => {
    if (
      this.IsNullOrUndefined(kingNode.piece) ||
      this.IsNullOrUndefined(leftRookNode.piece)
    )
      return false;

    const hasKingMoved = kingNode?.piece?.hasMoved === true; // to castle King can't move
    const hasRookMoved = leftRookNode?.piece?.hasMoved === true; // to castle rook can't move either

    if (hasKingMoved || hasRookMoved) return false;

    // there is open space to castle, basically eqch square until the rook is epmpty
    const pathFromKingToRookIsEmpty = [
      kingNode.left,
      kingNode.left?.left,
      kingNode.left?.left?.left,
    ].some((sq) => sq?.SquareHasPiece());

    if (pathFromKingToRookIsEmpty) return false;

    // last check is white can't be in check, and next two moves over left cannot also
    // create a situation of check

    let currentPostionCheck = this.IsWhiteInCheck(chessBoard);

    if (currentPostionCheck)
      // can't move if white is in check
      return false;

    // now we simulate two moves and check for each one
    const moveOne = chessBoard.craftMove([1, 5], [1, 4], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveOne);
    chessBoard.makeMove(moveOne);
    // [1, 5] -> [1, 4] -> Is in Check
    currentPostionCheck = this.IsWhiteInCheck(chessBoard);

    let lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    // [1, 4] -> [1, 3] -> Is in Check
    const moveTwo = chessBoard.craftMove([1, 4], [1, 3], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveTwo);
    chessBoard.makeMove(moveTwo);

    currentPostionCheck = this.IsWhiteInCheck(chessBoard);

    lastMove = chessBoard.moveBuffer.deepUndo() as MoveState;
    chessBoard.undoMove(lastMove);

    if (currentPostionCheck) {
      return false;
    }

    return true;
  };

  public CanWhiteCastleRight = (
    kingNode: Square,
    rightRookNode: Square,
    chessBoard: Board,
    turn: number
  ) => {
    if (
      this.IsNullOrUndefined(kingNode.piece) ||
      this.IsNullOrUndefined(rightRookNode.piece)
    )
      return false;

    const hasKingMoved = kingNode?.piece?.hasMoved === true; // to castle King can't move
    const hasRookMoved = rightRookNode?.piece?.hasMoved === true; // to castle rook can't move either

    if (hasKingMoved || hasRookMoved) return false;

    // there is open space to castle, basically eqch square until the rook is epmpty
    const pathFromKingToRookIsEmpty = [
      kingNode.right,
      kingNode.right?.right,
    ].some((sq) => sq?.SquareHasPiece());

    if (pathFromKingToRookIsEmpty) return false;

    // last check is white can't be in check, and next two moves over left cannot also
    // create a situation of check

    let currentPostionCheck = this.IsWhiteInCheck(chessBoard);

    if (currentPostionCheck)
      // can't move if white is in check
      return false;

    // now we simulate two moves and check for each one

    const moveOne = chessBoard.craftMove([1, 5], [1, 6], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveOne);
    chessBoard.makeMove(chessBoard.moveBuffer.LastMove as MoveState);

    currentPostionCheck = this.IsWhiteInCheck(chessBoard);
    chessBoard.moveBuffer.deepUndo();
    chessBoard.undoMove(moveOne);

    if (currentPostionCheck) {
      return false;
    }

    // [1, 4] -> [1, 3] -> Is in Check

    const moveTwo = chessBoard.craftMove([1, 6], [1, 7], chessBoard, true);
    chessBoard.moveBuffer.recordMove(moveTwo);
    chessBoard.makeMove(chessBoard.moveBuffer.LastMove as MoveState);

    currentPostionCheck = this.IsWhiteInCheck(chessBoard);
    chessBoard.moveBuffer.deepUndo();
    chessBoard.undoMove(moveTwo);

    if (currentPostionCheck) {
      return false;
    }

    // if no checks then King to [1, 3] and Rook to [1, 4]
    // and castle operation is complete

    // console.log("We can castle left.");
    return true;
  };

  public BlackStaleMate = (board: Board) => {
    const blackMoves = board.getAllBlackAttackingMoves(
      board.board,
      board.logic,
      board.turn
    );

    const blackKing = board.GetBlackKing(board.board);
    const blackKingMoves = board.getKingMovesV2(blackKing);

    return [...blackMoves, ...blackKingMoves].length === 0;
  };

  public WhiteStaleMate = (board: Board) => {
    const whiteMoves = board.getAllWhiteAttackingMoves(
      board.board,
      board.logic,
      board.turn
    );

    const whiteKing = board.GetWhiteKing(board.board);
    const whiteKingMoves = board.getKingMovesV2(whiteKing);

    return [...whiteMoves, ...whiteKingMoves].length === 0;
  };

  public IsStaleMate = (pieceColor: PieceColor, board: Board) => {
    // console.log("checking stalemate for:  " + pieceColor);
    return pieceColor === PieceColor.WHITE
      ? this.WhiteStaleMate(board)
      : this.BlackStaleMate(board);
  };

  public InsuficentMaterial = (chessBoard: Board) => {
    const checkKingBishopOrKnight = (
      pieces: Square[],
      otherPieces: Square[]
    ) => {
      const onlyKing = pieces.length === 0;

      const otherPieceAm = otherPieces.length === 1;
      const otherKnight = otherPieces.find(
        (sq) =>
          sq.piece?.pieceName === PieceNames.BISHOP ||
          sq.piece?.pieceName === PieceNames.KNIGHT
      );

      return onlyKing && otherPieceAm && otherKnight;
    };

    const whitePieces = Array.from(chessBoard.whitePieceAndAttacksCache.keys());
    const blackPieces = Array.from(chessBoard.blackPieceAndAttacksCache.keys());

    // console.log(whitePieces);

    // king scenario
    if (whitePieces.length === 0 && blackPieces.length === 0) return true;

    const checkWhite = checkKingBishopOrKnight(whitePieces, blackPieces);

    if (checkWhite) return true;

    const checkBlack = checkKingBishopOrKnight(blackPieces, whitePieces);

    if (checkBlack) return true;

    return false;
  };

  public IsThreeFoldRepition = (chessBoard: Board) => {
    const hasHistory = Array.from(chessBoard.positionHistory.entries());
    // console.log(hasHistory);
    const whiteTurn = hasHistory.find(
      ([s, n]) => n === 3 && s.includes("white-turn")
    );
    const blackTurn = hasHistory.find(
      ([s, n]) => n === 3 && s.includes("black-turn")
    );

    return (
      chessBoard.logic.isValue(whiteTurn) && chessBoard.logic.isValue(blackTurn)
    );
  };

  public fiftyPondMoveRule = (chessBoard: Board) => {
    // console.log(chessBoard.pondFiftyMoveRule);
    return chessBoard.pondFiftyMoveRule === 50;
  };
}
