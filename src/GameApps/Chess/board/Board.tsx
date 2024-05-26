import { Box, Flex } from "@chakra-ui/layout"
import { useState } from "react"

const RowHolder = (props: any) => {
    return (
        <Flex wrap="wrap" justifyContent="space-between" bg={(props.bg || "none")}>
            <BoardPiece /><BoardPiece /><BoardPiece />
            <BoardPiece /><BoardPiece /><BoardPiece />
            <BoardPiece /><BoardPiece />
        </Flex>
    )
}

const BoardPiece = () => {
    const [state, setState] = useState({color: "none"})
    return (
        <Box 
        onClick={() => setState(prevState => {
            return {...prevState, color: "blue"}
        })}
        w={"99px"} h={"100px"} border={"1px solid blue"} display={"inline-block"} bg={state.color}>
        </Box>
    );
}

export const ChessBoard = () => {
    return (
        <Box w={"802px"} h={"802px"} border={"1px solid black"} m={"auto"} mt={"50px"}>
            <RowHolder />
            <RowHolder />
            <RowHolder />
            <RowHolder />
            <RowHolder />
            <RowHolder />
            <RowHolder />
            <RowHolder />
        </Box>
    )
}