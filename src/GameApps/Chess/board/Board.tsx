// will calculate the moves ect here.
/*
    A board is 64 squares connected. 

    left - right
    forward back
    dialeft diaright
    diabackleft diabackright 
    each connected to the next. 

    Each square has a coordinate. 

    Every square if a piece is on that square dictactes how we look and move then additional layer
    of logic is overlayed. 

    pieces we will implement and in order are: 

    1. Pond
    2. Rook
    3. Knight
    4. Bishop
    5. Queen

*/

/*

        I generated a board or better yet graph board... so board is a graph that takes 
        a Square[][]. 

        That has a root 1-1 Node, which is a Square, then we can use iteration or 
        Recursion ot some point that design decision can be made later. 

        We have the ability currently to iterate the board using for loops
        And Crawl the board using the connectivity of the Squares such as going 
        .left .right .back .forward ect. ect. ect. 
*/

import { ChessMoveBuffer } from "../ChessMoveBuffer/ChessMoveBuffer";
import { MoveState } from "../ChessMoveBuffer/Move";
import {
  CheckMate,
  PieceLogicService,
} from "../PieceLogicService/PieceLogicService";
import { Piece } from "../pieces/Piece";
import  SettingsService  from "../SettingsService/SettingsService";
import {
  connectAllSquares,
  generateBoardOfSquares,
  getDiagonalLeftToRight,
  getDiagonalRightToLeft,
  getBishopMoves,
  getHorizontalRow,
  getKnightMoves,
  getNode,
  getQueenMoves,
  getRookMoves,
  getVerticalRow,
  getWhitePondMoves,
  getBlackPondMoves,
  PieceNames,
  PieceColor,
  PieceFactory,
  getKingMovesSpecialWhite,
  getKingMovesSpecialBlack,
} from "../utils/Utils";
import { MathCoordinate, Square } from "./Square";

// piece logic layer will be a dependency that is injected into the board...
// via the constructor... Maybe a singleton but basically upon usage
// it will determine what squares can be visible to move to
// and what not... it can also determine things like a possible castle,
// check, piece taking piece maybe even that...

// also a settings service... basically a service that will control
// and dictate the settings the user wants
// even in the future it can handle user and auth issues.

export class Board {
  // baord needs to be changed for root,
  // then in constuctor we have a method that will create our
  // graph, we will have a root, then methods for iteration ect.
  // we can create a method for spliting the all the nodes (squares)
  // into chunks which will then be rendered.
  public board: Square[][] = generateBoardOfSquares();
  public rootNode: Square | undefined = getNode([1, 1], this.board);

  public triggerUpdate: any = Date.now();

  public settingsService = SettingsService;
  public logic: PieceLogicService = new PieceLogicService();

  public turn: number = 0;

  public moveBuffer: ChessMoveBuffer = new ChessMoveBuffer();

  public blackPieceAndAttacksCache = new Map<Square, Square[]>();
  public whitePieceAndAttacksCache = new Map<Square, Square[]>();

  public positionHistory = new Map<string, number>();

  public pondFiftyMoveRule: number = 0;

  // public currentSelectedSquare: currentSelectedChessSquare = null;

  constructor() {
    this.boardSetup();
    this.testingMethodsSetupAndOperation();
  }

  public boardSetup = () => {
    this.connectSquares();
    // if (this.rootNode)
    //     this.rootNode.piece = new Pond();
    //let n  = getNode([2, 2], this.board);
    // if (n)
    //     n.piece = new Pond();
  };

  /*
          public getAllAttackingMoves = (board: Square[][], pieceColor: PieceColor) => {
    let moves: Square[] = [];
    const allAttackingSquaresWithPieceAndSameColor =
      this.getAllSquaresWhoHavePieceAndColor(board, pieceColor);

    allAttackingSquaresWithPieceAndSameColor.forEach((sq: Square) => {
      moves = [
        ...moves,
        ...this.getLegalAttackMovesForPieceFactory(
          sq,
          this.logic,
          this.turn,
          board
        ),
      ];
    });

    return moves;
  };
  
  */



  public undoLastPositionHistory = (hash: string) => {
    const count = this.positionHistory.get(hash) || 1;
    if (count <= 1) {
      this.positionHistory.delete(hash);
    } else {
      this.positionHistory.set(hash, count - 1);
    }
  };

  public updatePositionHistory = (hash: string) => {
    const count = this.positionHistory.get(hash) || 0;
    this.positionHistory.set(hash, count+1);
  };

  public reCacheWhitePieces = () => {
    const whitePieces = this.getAllSquaresWhoHavePieceAndColor(
      this.board,
      PieceColor.WHITE
    );

    this.whitePieceAndAttacksCache = whitePieces.reduce((acc, cur, idx) => {
      acc.set(
        cur,
        this.getLegalAttackMovesForPieceFactory(
          cur,
          this.logic,
          this.turn,
          this.board
        )
      );
      return acc;
    }, new Map<Square, Square[]>());

    //const whiteKing = this.GetWhiteKing(this.board) as Square;
    // const whiteKingMoves = this.getKingMovesV2(whiteKing, this.board, this.turn);
    // this.whitePieceAndAttacksCache.set(whiteKing, whiteKingMoves);

    return this.whitePieceAndAttacksCache;
  };

  public reCacheBlackPieces = () => {
    const blackPieces = this.getAllSquaresWhoHavePieceAndColor(
      this.board,
      PieceColor.BLACK
    );

    this.blackPieceAndAttacksCache = blackPieces.reduce((acc, cur, idx) => {
      acc.set(
        cur,
        this.getLegalAttackMovesForPieceFactory(
          cur,
          this.logic,
          this.turn,
          this.board
        )
      );
      return acc;
    }, new Map<Square, Square[]>());

    // const blackKing = this.GetBlackKing(this.board) as Square;
    // const blackKingMoves = this.getKingMovesV2(blackKing, this.board, this.turn);
    // this.blackPieceAndAttacksCache.set(blackKing, blackKingMoves);

    return this.blackPieceAndAttacksCache;
  };

  // ******************************************************************
  // Testing only
  // ******************************************************************

  // for testing and visiual testing
  // if I want to test additional things I
  // add all the logic if.
  public testingMethodsSetupAndOperation = () => {
    //this.make8_1Green();
  };
  // setup up method.
  public connectSquares = () => {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        let rootNode = this.board[i][j];
        connectAllSquares(this.board, rootNode as Square);
      }
    }
  };
  /*
        Mehtods below this comment are for testing 

        And will be moved enventually into a unit test 

        Type format... 
    */
  // Testing method only. - will comment out later
  // testing left to right
  public make1_1RowRed = () => {
    const sqs = getHorizontalRow(this.rootNode, [], this.logic);
    sqs.forEach((sq: Square) => {
      sq.SquareBgColor = "red";
    });
  };

  // testing method only - will comment out later
  // for testing only
  public make2_1ColBlue = () => {
    const node2_1 = getNode([2, 1], this.board);
    const sqs = getVerticalRow(node2_1, [], this.logic);
    sqs.forEach((sq: Square) => {
      sq.SquareBgColor = "blue";
    });
  };
  // Testing if diagonal left to right is working.
  // so 1-1 to 8-8 should be purple.
  public make1_1Purple = () => {
    const sqs = getDiagonalLeftToRight(this.rootNode, []);
    sqs.forEach((sq: Square) => {
      sq.SquareBgColor = "purple";
    });
  };
  // testing if diagonals right to left
  // function properly.
  // testing if diagonal right to left functions as well.
  public make8_1Green = () => {
    const node = getNode([1, 8], this.board);
    const sqs = getDiagonalRightToLeft(node, []);
    // console.log(sqs);
    sqs.forEach((sq: Square) => {
      sq.SquareBgColor = "green";
    });
  };

  public clearBoardBgColor = () => {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        let rootNode = this.board[i][j];
        rootNode.SquareBgColor = "";
        rootNode.possiblePieceMove = false;
      }
    }
  };

  // testing only
  public updateBoardHorizontal = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getHorizontalRow(node, [], this.logic);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateBoardVertical = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getVerticalRow(node, [], this.logic);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  // Methods below are for the game of chess
  // these will be enterpise
  // everything above is testing and for analization...

  // we can have a factory for pieces and moves and we abstract the logic for all pieces so
  // the piece is just that a piece but we can

  public updateBishopMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const pieceColor = node.piece?.pieceColor as PieceColor;

    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
      // console.log(sqs);
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }

    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateRookMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
      // console.log(sqs);
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateQueenMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
      // console.log(sqs);
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateKnightMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
      // console.log(sqs);
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updatePondMovesWhite = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
      // console.log(sqs);
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updatePondMovesBlack = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    let sqs: Square[] = [];
    if (node.piece?.pieceColor === PieceColor.WHITE) {
      sqs = this.whitePieceAndAttacksCache.get(node) || [];
    } else {
      sqs = this.blackPieceAndAttacksCache.get(node) || [];
    }

    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateKingMoves = (coordiante: any) => {
    const node = getNode(coordiante, this.board) as Square;
    const bd = this;
    let sqs: Square[] = this.getKingMovesV2(node);

    const specialMoves = node?.piece?.IsWhite()
      ? getKingMovesSpecialWhite(node, bd, this.turn)
      : getKingMovesSpecialBlack(node, bd, this.turn);

    this.notifyUserOfMoveableSquaresAndSelectedPiece(
      [...sqs, ...specialMoves],
      node
    );
  };

  public populateSquareWithPiece = (coordinate: any, piece: any) => {
    const node = getNode(coordinate, this.board) as Square;
    node.piece = piece;
  };

  // get square helper
  public getSquare = (coordinate: MathCoordinate): Square => {
    const node = getNode(coordinate, this.board) as Square;
    return node;
  };

  public craftMove = (
    from: MathCoordinate,
    to: MathCoordinate,
    board: Board,
    testingMove: boolean
  ) => {
    const fromNode = getNode(from, this.board) as Square;
    const toNode = getNode(to, this.board) as Square;
    const IsPond = fromNode.piece?.pieceName === PieceNames.POND;
    const move: MoveState = {
      from,
      to,
      testingMove,
      previousTurn: this.turn,
      currentTurn: this.turn + 1,
      movedPiece: fromNode?.piece as Piece,
      IsPond,
      previousFiftyMoveStepCounter: this.pondFiftyMoveRule,
      previousMovedPieceState: (fromNode?.piece as Piece)?.clone(),
      capturedPiece: toNode?.piece?.clone(),
      special: {
        promotion: undefined,
        enPassantCapture: undefined,
        castleKing: undefined,
        pondDoubleMove: undefined,
      },
    };

    // check the enPassant
    const [canEnPassantLeft, canEnPassantRight] =
      this.logic.shouldNotifySquaresLeftAndRightOfEnPassant(fromNode, toNode);
    // write logic here for determing if it's a doulbe move pond
    // if it is it's going to tag left square and right square if it's
    // a pond and then it's going to flag pond piece type that they can en-passant
    // and on what turn of the game it can so if we are on step 25, then the opposing
    // player can en-passant step 26 and only on step 26, if a piece is there then it
    // can take it if it's the other color

    const leftNode = toNode?.left;
    const rightNode = toNode?.right;

    if (
      canEnPassantLeft &&
      this.logic.isValue(leftNode) &&
      leftNode?.SquareHasPiece()
    ) {
      let pond = leftNode?.piece as Piece;
      pond.enPassantDetails.CanEnPassant = true;
      pond.enPassantDetails.turn = this.turn + 1;
      // console.log(pond);
    }

    if (
      canEnPassantRight &&
      this.logic.isValue(rightNode) &&
      rightNode?.SquareHasPiece()
    ) {
      let pond = rightNode?.piece as Piece;
      pond.enPassantDetails.CanEnPassant = true;
      pond.enPassantDetails.turn = this.turn + 1;
      // console.log(pond);
    }

    // when a piece moves we need to flip that boolean
    if (fromNode) fromNode.piece?.notifyPieceHasMoved();

    // if pond is doing a doulbe move we need to set that turn #
    // so later when doing en-passant logic we can have better tests...
    if (this.logic.IsPondDoubleMove(fromNode as Square, toNode as Square)) {
      fromNode?.piece?.setPondDoubleMoveTurn(this.turn);
      move.special.pondDoubleMove = true;
    }

    if (toNode) {
      const enPassantCheckRight =
        toNode.IsEnPassantMove &&
        this.logic.IsPondMoveForwardRight(fromNode as Square, toNode as Square);
      const enPassantCheckLeft =
        toNode.IsEnPassantMove &&
        this.logic.IsPondMoveForwardLeft(fromNode as Square, toNode as Square);

      if (enPassantCheckRight) {
        // need to null out right piece // right node is now empty.
        // fromNode?.right?.makeSquareEmpty();
        move.special.enPassantCapture = {
          pondTaken: fromNode?.right?.mathematicalCoordinate as MathCoordinate,
          pondTakenPiece: fromNode?.right?.piece?.clone() as Piece,
        };
        fromNode?.piece?.ResetEnPassantDetails();
        toNode.piece?.ResetEnPassantDetails(); // reset deails of en-passant
      } else if (enPassantCheckLeft) {
        // need to null out right piece // right node is now empty.
        // fromNode?.left?.makeSquareEmpty();
        move.special.enPassantCapture = {
          pondTaken: fromNode?.left?.mathematicalCoordinate as MathCoordinate,
          pondTakenPiece: fromNode?.left?.piece?.clone() as Piece,
        };
        fromNode?.piece?.ResetEnPassantDetails();
        toNode.piece?.ResetEnPassantDetails(); // reset deails of en-passant
      }

      const handleCastle = this.logic.HandleCastleCanMoveLogic(
        fromNode as Square,
        toNode
      );

      if (handleCastle) {
        const rookPiece = (
          getNode(handleCastle.from, this.board) as Square
        ).piece?.clone() as Piece;

        move.special.castleKing = {
          rookFrom: handleCastle.from,
          rookTo: handleCastle.to,
          rookPiece,
          desc: handleCastle.desc
        };
      }

      if (this.logic.ShouldPondPromoteV2(fromNode, toNode)) {
        move.special.promotion = {
          onSquareWhenPromoted: toNode.mathematicalCoordinate,
          piecePromotedTo: undefined,
        };
      }
    }

    return move;
  };

  public makeMove = (move: MoveState, pondPromotion:boolean = false) => {
    const { from, to, movedPiece, capturedPiece, currentTurn, special, IsPond } = move;

    const fromNode = getNode(from, this.board) as Square;
    const toNode = getNode(to, this.board) as Square;

    const colorOfPieceMoving = fromNode.piece?.pieceColor as PieceColor;

    fromNode.makeSquareEmpty(); // make the current square empty
    toNode.SetNodeWithNewPiece(movedPiece); // move the piece from to, toNode...

    if (special) {
      const { enPassantCapture, castleKing, pondDoubleMove, promotion } =
        special;

      if (enPassantCapture) {
        const pondToTake = getNode(
          enPassantCapture.pondTaken,
          this.board
        ) as Square;
        pondToTake.makeSquareEmpty(); // make square empty basically pond was taken.
        //this.resetEnPassantDetailsAfterTake(this);
        toNode?.piece?.ResetEnPassantDetails();
      }

      if (castleKing) {
        const { rookFrom, rookTo } = castleKing;
        const rookFromNode = getNode(rookFrom, this.board) as Square;
        const rookToNode = getNode(rookTo, this.board) as Square;

        rookToNode.SetNodeWithNewPiece(rookFromNode.piece); // set from to, the to Node
        rookFromNode.makeSquareEmpty(); // make from Node empty.
      }

      if (promotion) {
        toNode.SetNodeWithNewPiece(promotion.piecePromotedTo);
      }
    }

    if (IsPond === false && capturedPiece?.pieceName !== PieceNames.POND) {
      this.pondFiftyMoveRule += 1;
    } else {
      this.pondFiftyMoveRule = 0;
    }

    this.reCacheWhitePieces();
    this.reCacheBlackPieces();

    // this.updatePositionHistory();
    if (pondPromotion === false)
      this.incrementTurn(); // increment the game
  };

  public undoMove = (move: MoveState) => { 
    const {
      from,
      to,
      capturedPiece,
      special,
      previousMovedPieceState,
      previousFiftyMoveStepCounter
    } = move;

    const toNode = getNode(from, this.board) as Square;
    const fromNode = getNode(to, this.board) as Square;

    const colorOfPieceMoving = fromNode.piece?.pieceColor as PieceColor;

    fromNode.makeSquareEmpty(); // make the current square empty

    if (capturedPiece) {
      fromNode.SetNodeWithNewPiece(capturedPiece);
    }

    toNode.SetNodeWithNewPiece(previousMovedPieceState); // move the piece from to, toNode...

    if (special) {
      const { enPassantCapture, castleKing } =
        special;

      if (enPassantCapture) {
        const pondToTake = getNode(
          enPassantCapture.pondTaken,
          this.board
        ) as Square;
        pondToTake.SetNodeWithNewPiece(enPassantCapture.pondTakenPiece); // make square empty basically pond was taken.
      }

      if (castleKing) {
        const { rookFrom, rookTo, rookPiece } = castleKing;
        const rookFromNode = getNode(rookFrom, this.board) as Square;
        const rookToNode = getNode(rookTo, this.board) as Square;

        rookToNode.makeSquareEmpty(); // set from to, the to Node
        rookFromNode.SetNodeWithNewPiece(rookPiece); // make from Node empty.
      }
    }


    this.pondFiftyMoveRule = previousFiftyMoveStepCounter;

    this.reCacheWhitePieces();
    this.reCacheBlackPieces();

    // this.undoLastPositionHistory();
    this.decrementTurn(); // decrement the game
  };

  public notifyUserOfMoveableSquaresAndSelectedPiece = (
    sqs: any,
    node: any
  ) => {
    sqs.forEach((sq: Square) => {
      sq.makeSquareMoviable(this.settingsService.moveableSquareColor);
    });

    node.SquareBgColor = this.settingsService.selectedSquareColor;
  };

  public incrementTurn = () => {
    this.turn += 1;
  };

  public decrementTurn = () => {
    this.turn -= 1;
  };

  public promotePond = (
    to: MathCoordinate,
    pieceName: PieceNames,
    pieceColor: PieceColor
  ) => {
    const squareToPromote = getNode(to, this.board);
    const pieceToBePromotedTo = PieceFactory(pieceName, pieceColor);
    let lastMove = this.moveBuffer.deepUndo() as MoveState;
    const newMoveToRecord: MoveState = {
      ...lastMove,
      special: {
        ...lastMove.special,
        promotion: {
          onSquareWhenPromoted:
            squareToPromote?.mathematicalCoordinate as MathCoordinate,
          piecePromotedTo: pieceToBePromotedTo as Piece,
          pieceThatWas: squareToPromote?.piece?.clone() as Piece,
        },
      },
    };

    this.moveBuffer.recordMove(newMoveToRecord);
    this.makeMove(newMoveToRecord, true);
    squareToPromote?.SetNodeWithNewPiece(pieceToBePromotedTo);
  };

  public getAllSquaresWhoHavePieceAndColor = (
    board: Square[][],
    pieceColor: PieceColor
  ) => {
    return board.flatMap((sq) =>
      sq.filter(
        (s) =>
          s?.SquareHasPiece() &&
          s.piece?.pieceColor === pieceColor &&
          s.piece.pieceName !== PieceNames.KING
      )
    );
  };

  public getAllAttackingMoves = (board: Square[][], pieceColor: PieceColor) => {
    if (pieceColor === PieceColor.WHITE) {
      return Array.from(this.whitePieceAndAttacksCache.values()).flat();
    } else {
      return Array.from(this.blackPieceAndAttacksCache.values()).flat();
    }
  };

  public getAllPossibleMovesOfPlayerInCheck = (
    board: Square[][],
    pieceColorOfPlayerInCheck: PieceColor
  ) => {
    // console.log(pieceColorOfPlayerInCheck);
    const allSquaresOfPlayerInCheck: CheckMate[] =
      this.getAllSquaresWhoHavePieceAndColor(
        board,
        pieceColorOfPlayerInCheck
      ).map((sq: Square) => {
        const checkMateMoves: CheckMate = {
          SquareFrom: sq,
          SquareToPossibilities: this.getLegalAttackMovesForPieceFactory(
            sq,
            this.logic,
            this.turn + 1,
            board
          ),
        };
        return checkMateMoves;
      });
    // console.log(allSquaresOfPlayerInCheck)
    return allSquaresOfPlayerInCheck;
  };

  public GetBlackKing = (board: Square[][]) => {
    return board
      .flatMap((s) => s)
      .find(
        (sq) =>
          sq?.SquareHasPiece() &&
          sq?.piece?.pieceName === PieceNames.KING &&
          sq?.piece?.pieceColor === PieceColor.BLACK
      );
  };

  public GetWhiteKing = (board: Square[][]) => {
    return board
      .flatMap((s) => s)
      .find(
        (sq) =>
          sq?.SquareHasPiece() &&
          sq?.piece?.pieceName === PieceNames.KING &&
          sq?.piece?.pieceColor === PieceColor.WHITE
      );
  };

  public GetWhitePieces = (board: Square[][]) => {
    return board
      .flatMap((s) => s)
      .filter(
        (sq) =>
          sq.SquareHasPiece() && sq?.piece?.pieceColor === PieceColor.WHITE
      );
  };

  public getAllWhiteAttackingMoves = (
    board: Square[][],
    logic: PieceLogicService,
    turn: number
  ) => {
    const whiteAttacks = Array.from(
      this.whitePieceAndAttacksCache.values()
    ).flat();

    return [...whiteAttacks];
  };

  public getAllBlackAttackingMoves = (
    board: Square[][],
    logic: PieceLogicService,
    turn: number
  ) => {
    const blackAttacks = Array.from(
      this.blackPieceAndAttacksCache.values()
    ).flat();

    return [...blackAttacks];
  };

  public GetBlackPieces = (board: Square[][]) => {
    return board
      .flatMap((s) => s)
      .filter(
        (sq) =>
          sq.SquareHasPiece() && sq?.piece?.pieceColor === PieceColor.BLACK
      );
  };

  public getKingMovesV2 = (node: Square | undefined): Square[] => {
    if (!node) return [];

    const kingColor = this.logic.IsWhiteKing(node) ? "white" : "black";

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

    const legalMoves: Square[] = [];

    const bd = this;

    for (const target of surroundingSquares) {
      // Can't capture same color
      if (!this.logic.pieceIsOtherColor(node, target)) continue;

      // Simulate the move
      const from = node.mathematicalCoordinate;
      const to = target.mathematicalCoordinate;

      const move = bd.craftMove(from, to, bd, true);
      
      bd.makeMove(move);

      //console.log(kingColor);

      const stillSafe =
        kingColor === "white"
          ? !bd.logic.IsWhiteInCheck(bd)
          : !bd.logic.IsBlackInCheck(bd);

      bd.undoMove(move);

      if (stillSafe) {
        legalMoves.push(target);
      }
    }
    // console.log(legalMoves);

    return legalMoves;
  };

  public getLegalAttackMovesForPieceFactory = (
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
        return this.getKingMovesV2(node);
      }
      default: {
        return [];
      }
    }
  };

  public generateHash = (chessBoard: Board, turn: number) => {
    const squares = chessBoard.board.flatMap((s) => s);
    // console.log(squares.length);
    let hash = squares.reduce((acc, cur, idx) => {
      return (acc += cur?.SquareHasPiece()
        ? `${cur.piece?.pieceName}-${cur.piece?.pieceColor}-${cur.mathematicalCoordinate}`
        : `--${cur.mathematicalCoordinate}`);
    }, "");
    // onsole.log(this.turn);
    const PlayersTurn = (turn % 2 === 0 ? 'white-turn' : 'black-turn');
    // console.log(turn);
    hash += `|turn:${PlayersTurn}`;

    return hash;
  };
}
