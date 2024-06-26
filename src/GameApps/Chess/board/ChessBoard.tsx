import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Pond } from "../pieces/Pond";
import { Board } from "./Board";
import { Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { UpdateChessBoard, getBoard, getTestingState } from "../../../store/slices/chessSlice";
import { getHorizontalRow, getNode } from "../utils/Utils";



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
    const [x, y] = props.sq.mathematicalCoordinate;
    const dispatch = useDispatch();
    const testing = useSelector(getTestingState);
    const boardobj = useSelector(getBoard)
    const board = boardobj.board;
    return (
        <Box 
        onClick={() =>{
            if (testing.horozontal) {
                // get left and right squares make them blue and 
                // the selected root node of this square gold...
                boardobj.clearBoardBgColor(); 
                boardobj.updateBoardHorizontal([x, y]);
                dispatch(UpdateChessBoard(boardobj));
            }
        }}
        // bg={(x=== 1 && y === 1) ? "red": state.color}
        w={"99px"} h={"100px"} border={"1px solid blue"} display={"inline-block"} bg={props.sq.SquareBgColor}>
            {x+"-"+y}
        </Box>
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