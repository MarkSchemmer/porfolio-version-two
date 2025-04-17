import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import blackPond from "../../utils/GameImages/bp.png";
import blackRook from "../../utils/GameImages/br.png";
import blackKnight from "../../utils/GameImages/bk.png";
import blackBishop from "../../utils/GameImages/bb.png";
import blackQueen from "../../utils/GameImages/bq.png";
import blackKing from "../../utils/GameImages/bk.png";
import "./BoxPiece.scss";
import { useDispatch, useSelector } from "react-redux";
import { PieceColor, PieceNames } from "../../utils/Utils";
import { getCurrentPieceBeingManipulated, updatePieceManipulationTesting } from "../../../../store/slices/chessSlice";


/*
        

*/

/*

    - After testing is complete adding chess coordinates and history of move detection

*/

/*
    Notes on board manipulation section: 

    1. on-off button - when on resets board, switched; off resets entire board
    
    2. when on, select one piece then click square on board and render that piece
       continue slecting different pieces and playing them on the board 

    3. when finished hit the start button and pieces can move on the board and all rules apply
       we use this testing phase to understand how castling works 

*/

/*
        Last part of tests are game scenarios - list out scenarios as they come up.

        1. Check detection
        2. Castle 
        3. en-passant
        4. Check mate scenarios 
        5. Tie scenarios 

*/
const pieces = [
    { name: PieceNames.POND, image: blackPond, pieceColor: PieceColor.BLACK }, 
    { name: PieceNames.KNIGHT, image: blackKnight,  pieceColor: PieceColor.BLACK }, 
    { name: PieceNames.ROOK, image: blackRook,  pieceColor: PieceColor.BLACK }, 
    { name: PieceNames.QUEEN, image: blackQueen,  pieceColor: PieceColor.BLACK }, 
    { name: PieceNames.BISHOP, image: blackBishop,  pieceColor: PieceColor.BLACK }, 
    { name: PieceNames.KING, image: blackKing,  pieceColor: PieceColor.BLACK }
];

export const BoxPiece = (props:any) => {
    const dispatch = useDispatch();
    const currentPiecebeingManipulated = useSelector(getCurrentPieceBeingManipulated)
    const {name, image, pieceColor} = props.pieceObj;
    return (
        <Box 
        onClick={() => {
            dispatch(
                updatePieceManipulationTesting({name, pieceColor})
            )
        }}
        className="piece"
        style={{
            borderColor: currentPiecebeingManipulated?.pieceSelected?.name === name ? 'gold' : 'black',
            opacity: currentPiecebeingManipulated?.pieceSelected?.name === name ? 0.5 : 1,
        }}
        border={"1px solid black"} borderRadius={"5px"} p={1} textAlign={'center'} backgroundColor={"#0cafff"}>
            <Text color={"yellow"}>{name}</Text>
            <Box>
                <img style={{ height: "55px"}} src={image} />
            </Box>
        </Box>
    )
}

export const BoxPieces = (props:any) => {
    return (
        <Flex className="box-container" 
        direction={"row"} 
        alignItems={"center"} 
        width={"100%"} 
        placeItems={"center"} 
        marginBottom={"50px"}>
            <Box>
                {pieces.map(p => <BoxPiece key={p.name} pieceObj={p} />)}
            </Box>
        </Flex>
    )
}
