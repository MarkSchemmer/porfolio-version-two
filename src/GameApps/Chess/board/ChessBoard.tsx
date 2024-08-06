import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Pond } from "../pieces/Pond";
import { Board } from "./Board";
import { Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { UpdateChessBoard, getBoard, getTestingState } from "../../../store/slices/chessSlice";
import { coordinateToLetterValueMap, getHorizontalRow, getNode } from "../utils/Utils";



// Will draw the board. 
const RowHolder = (props: any) => {
    return (
        <Flex wrap="wrap" justifyContent="space-between" bg={(props.bg || "none")}>
            { props.squares.map((sq: Square) => <BoardPiece key={sq.id} sq={sq} />)}
        </Flex>
    )
}

const BoardPiece = (props: any) => {
    const [state, setState] = useState({color: "none"})
    const [x, y] = props.sq.mathematicalCoordinate as [number, number];
    const dispatch = useDispatch();
    const testing = useSelector(getTestingState);
    const boardobj = useSelector(getBoard)
    const board = boardobj.board;

    const bottomRight = (coordinateToLetterValueMap as any)[y.toString()];

    return (
        <Flex 
        alignItems={"center"}
        onClick={() => {
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
                boardobj.updateBoardDiagonal([x, y]);
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
        }}
        // bg={(x=== 1 && y === 1) ? "red": state.color}
        w={"99px"} h={"100px"} border={"1px solid blue"} display={"inline-block"} bg={props.sq.SquareBgColor}>
            { y === 1 ? <strong style={{ paddingLeft: "5px", paddingTop: "5px", position: "absolute"}}>{x}</strong> : null }
            {
                props.sq.piece ? <Box position={"absolute"}>{props.sq.piece.draw()}</Box> : null 
            }
            {/*     
                    width: 10px;
                    margin-left: calc(100% - 20px); */}
            { x === 1 ? <strong style={{position: "absolute", paddingLeft: "82px", paddingTop: "70px"}}>{bottomRight}</strong> : null }

        </Flex>
    );
}

export const ChessBoard = () => {
    // will update the input into Board later to be proper. 
    const boardobj = useSelector(getBoard);
    const chB = boardobj.board;

    return (
        <Box w={"802px"} h={"802px"} border={"1px solid black"} m={"auto"} mt={"50px"}>
            { chB.map((row: Square[], idx: number) => <RowHolder key={idx} squares={row} /> ) }
        </Box>
    )
}