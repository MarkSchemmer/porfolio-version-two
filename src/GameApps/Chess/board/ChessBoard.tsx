import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Board } from "./Board";
import { Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateChessBoard,
  getBoard,
  getCurrentPieceBeingManipulated,
  getTestingState,
} from "../../../store/slices/chessSlice";
import {
  coordinateToLetterValueMap,
  getHorizontalRow,
  getNode,
  HandleSquareClickWithPiece,
  PieceFactory,
} from "../utils/Utils";

// Will draw the board.
const RowHolder = (props: any) => {
  return (
    <Flex wrap="wrap" justifyContent="space-between" bg={props.bg || "none"}>
      {props.squares.map((sq: Square) => (
        <BoardPiece key={sq.id} sq={sq} />
      ))}
    </Flex>
  );
};

const BoardPiece = (props: any) => {
  const [state, setState] = useState({ color: "none" });
  const [x, y] = props.sq.mathematicalCoordinate as [number, number];
  const dispatch = useDispatch();
  const testing = useSelector(getTestingState);
  const boardobj = useSelector(getBoard);
  const chessPieceManipulation = useSelector(getCurrentPieceBeingManipulated);
  const board = boardobj.board;

  const bottomRight = (coordinateToLetterValueMap as any)[y.toString()];

  return (
    <Flex
      alignItems={"center"}
      onClick={() => {
        if (Object.values(testing).some(v => v)) {
          // console.log('testing block')
          // console.log(testing)
          if (testing.horozontal) {
            // get left and right squares make them blue and
            // the selected root node of this square gold...
            boardobj.clearBoardBgColor();
            boardobj.updateBoardHorizontal([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.vertical) {
            // get left and right squares make them blue and
            // the selected root node of this square gold...
            boardobj.clearBoardBgColor();
            boardobj.updateBoardVertical([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.diagonal) {
            boardobj.clearBoardBgColor();
            boardobj.updateBishopMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.rook) {
            boardobj.clearBoardBgColor();
            boardobj.updateRookMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.knight) {
            boardobj.clearBoardBgColor();
            boardobj.updateKnightMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.queen) {
            boardobj.clearBoardBgColor();
            boardobj.updateQueenMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }
        } else if (chessPieceManipulation.active === true) {
            // console.log('piece manipulation block');
            const {name, pieceColor} = chessPieceManipulation.pieceSelected;
            const piece = PieceFactory(name, pieceColor);
            boardobj.populateSquareWithPiece([x, y], piece);
            dispatch(UpdateChessBoard(boardobj));
        } else {
          // console.log('Handle click else block')

          // if the board is click check if piece is there then if the piece is there 
          // we need a signal that activates and store active piece, [x, y] coordinate as well
          // I'm guessing what I can do is I can pass the piecename, coordinate, and finally piece color
          // use this information to check if a piece exists in this coordinate if so then we calculate the moves it can move
          
          // ------------------------------------------------------------------------------------------------------------------
          // ------------------------------------------------------------------------------------------------------------------

          // the code below this, will click a piece and render the moves on the board
          // But now we need a mechanism for an active piece so... we can click a square and move that if it's 
          // one of the valid squares it can actually move to. 
          const chessBoard = HandleSquareClickWithPiece([x, y], boardobj);
          dispatch(UpdateChessBoard(chessBoard));
          
        }
      }}
      // bg={(x=== 1 && y === 1) ? "red": state.color}
      w={"99px"}
      h={"100px"}
      border={"1px solid black"}
      display={"inline-block"}
      bg={props.sq.SquareBgColor}
    >
      {y === 1 ? (
        <strong
          style={{
            paddingLeft: "5px",
            paddingTop: "5px",
            position: "absolute",
          }}
        >
          {x}
        </strong>
      ) : null}
      {props.sq.piece ? (
        <Box position={"absolute"}>{props.sq.piece.draw()}</Box>
      ) : null}
      {/*     
                    width: 10px;
                    margin-left: calc(100% - 20px); */}
      {x === 1 ? (
        <strong
          style={{
            position: "absolute",
            paddingLeft: "82px",
            paddingTop: "70px",
          }}
        >
          {bottomRight}
        </strong>
      ) : null}
    </Flex>
  );
};

export const ChessBoard = () => {
  // will update the input into Board later to be proper.
  const boardobj = useSelector(getBoard);
  const chB = boardobj.board;

  return (
    <Box
      w={"802px"}
      h={"802px"}
      border={"1px solid black"}
      m={"auto"}
      mt={"50px"}
    >
      {chB.map((row: Square[], idx: number) => (
        <RowHolder key={idx} squares={row} />
      ))}
    </Box>
  );
};
