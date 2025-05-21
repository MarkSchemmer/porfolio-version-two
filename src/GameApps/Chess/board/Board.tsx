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

import { CheckMate, PieceLogicService } from "../PieceLogicService/PieceLogicService";
import { Piece } from "../pieces/Piece";
import { SettingsService } from "../SettingsService/SettingsService";
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
  getKingMoves,
  PieceNames,
  PieceColor,
  PieceFactory,
  getLegalAttackMovesForPieceFactory,
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

  public settingsService: SettingsService = new SettingsService();
  public logic: PieceLogicService = new PieceLogicService();

  public turn: number = 0;

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

  public deepClone(): Board {
    const newBoard = new Board();
    const cloneMap = new Map<string, Square>();
  
    // Step 1: Clone Squares (structure only, no links yet)
    newBoard.board = this.board.map(row =>
      row.map(sq => {
        const clone = sq.generateDeepClone();
        cloneMap.set(`${sq.mathematicalCoordinate[0]},${sq.mathematicalCoordinate[1]}`, clone);
        return clone;
      })
    );
  
    // Step 2: Reconnect directional references
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const original = this.board[i][j];
        const cloned = newBoard.board[i][j] as any;
  
        const connect = (direction: keyof Square) => {
          const neighbor = original[direction] as any;
          if (neighbor) {
            const key = `${neighbor.mathematicalCoordinate[0]},${neighbor.mathematicalCoordinate[1]}`;
            cloned[direction] = cloneMap.get(key);
          }
        };
  
        connect('left');
        connect('right');
        connect('forward');
        connect('back');
        connect('diagonalLeft');
        connect('diagonalRight');
        connect('diagonalBackLeft');
        connect('diagonalBackRight');
      }
    }
  
    // Step 3: Clone other board properties
    newBoard.turn = this.turn;
    newBoard.rootNode = newBoard.getSquare(this.rootNode!.mathematicalCoordinate); // assumes rootNode exists
    newBoard.settingsService = this.settingsService; // assuming stateless or safe to share
    newBoard.logic = this.logic; // assuming stateless or safe to share
    newBoard.triggerUpdate = Date.now(); // or clone if needed
  
    return newBoard;
  }

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
    console.log(sqs);
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
    const sqs = getBishopMoves(node, this.logic);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateRookMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getRookMoves(node, this.logic);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateQueenMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getQueenMoves(node, this.logic);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateKnightMoves = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getKnightMoves(node);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updatePondMovesWhite = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getWhitePondMoves(node, this.logic, this.turn);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updatePondMovesBlack = (coordinate: any) => {
    const node = getNode(coordinate, this.board) as Square;
    const sqs = getBlackPondMoves(node, this.logic, this.turn);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
  };

  public updateKingMoves = (coordiante: any) => {
    const node = getNode(coordiante, this.board) as Square;
    const sqs = getKingMoves(node);
    this.notifyUserOfMoveableSquaresAndSelectedPiece(sqs, node);
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

  public movePieceFromTo = (from: MathCoordinate, to: MathCoordinate) => {
    const fromNode = getNode(from, this.board);
    const toNode = getNode(to, this.board);
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
        fromNode?.right?.makeSquareEmpty();
        fromNode?.piece?.ResetEnPassantDetails();
        toNode.piece?.ResetEnPassantDetails(); // reset deails of en-passant
      } else if (enPassantCheckLeft) {
        // need to null out right piece // right node is now empty.
        fromNode?.left?.makeSquareEmpty();
        fromNode?.piece?.ResetEnPassantDetails();
        toNode.piece?.ResetEnPassantDetails(); // reset deails of en-passant
      }

      // need to check the left side...

      toNode.SetNodeWithNewPiece(fromNode?.piece);
    }

    if (fromNode) fromNode.makeSquareEmpty();

    // check if a pond hit 8 line or a 1 line depending on the
    // piece color -> trigger the alert window selection so user has to select a new piece
    // have the clicks options and just click which one
    // Queen, Rook, Knight, Bishop

    // incerement the turn so we know we made a move on our on the next...
    this.incrementTurn();
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

  public promotePond = (
    to: MathCoordinate,
    pieceName: PieceNames,
    pieceColor: PieceColor
  ) => {
    const squareToPromote = getNode(to, this.board);
    squareToPromote?.SetNodeWithNewPiece(PieceFactory(pieceName, pieceColor));
  };

  public getAllSquaresWhoHavePieceAndColor = (board: Board, pieceColor: PieceColor) => {
    return board.board.flatMap((sq) =>
      sq.filter(
        (s) =>
          s?.SquareHasPiece() &&
          s.piece?.pieceColor === pieceColor
      )
    );
  };

  public getAllAttackingMoves = (board: Board, pieceColor: PieceColor) => {
    let moves: Square[] = [];
    const allAttackingSquaresWithPieceAndSameColor = this.getAllSquaresWhoHavePieceAndColor(board, pieceColor);

    allAttackingSquaresWithPieceAndSameColor.forEach((sq: Square) => {
       moves = [...moves, ...getLegalAttackMovesForPieceFactory(sq, this.logic, this.turn)];
    });


    return moves;
  };

  public getAllPossibleMovesOfPlayerInCheck = (board: Board, pieceColorOfPlayerInCheck: PieceColor) => {
    // console.log(pieceColorOfPlayerInCheck);
    const allSquaresOfPlayerInCheck: CheckMate[] = this.getAllSquaresWhoHavePieceAndColor(board, pieceColorOfPlayerInCheck)
    .map((sq: Square) => {
        const checkMateMoves: CheckMate = {
          SquareFrom: sq,
          SquareToPossibilities: getLegalAttackMovesForPieceFactory(sq,  this.logic, this.turn+1)
        };
        return checkMateMoves;
    });
    // console.log(allSquaresOfPlayerInCheck)
    return allSquaresOfPlayerInCheck;
  }
}
