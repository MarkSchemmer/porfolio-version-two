import { Box, Flex } from "@chakra-ui/layout"
import { useState } from "react"
import { Pond } from "../pieces/Pond"
import { Board } from "./Board"
import { Square } from "./Square"



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
    return (
        <Box 
        onClick={() => setState(prevState => {
            return {...prevState, color: "blue"}
        })}
        w={"99px"} h={"100px"} border={"1px solid blue"} display={"inline-block"} bg={state.color}>
            {x+"-"+y}
        </Box>
    );
}

export const ChessBoard = () => {
    // will update the input into Board later to be proper. 
    const [chB, setBoard] = useState(new Board([]))

    return (
        <Box w={"802px"} h={"802px"} border={"1px solid black"} m={"auto"} mt={"50px"}>
            { chB.board.map((row: Square[], idx: number) => <RowHolder key={idx} squares={row} /> )}
        </Box>
    )
}