import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import blackPond from "../../utils/GameImages/bp.png";
import blackRook from "../../utils/GameImages/br.png";
import blackKnight from "../../utils/GameImages/bk.png";
import blackBishop from "../../utils/GameImages/bb.png";
import blackQueen from "../../utils/GameImages/bq.png";
import blackKing from "../../utils/GameImages/bk.png";


import "./BoxPiece.scss";

export const BoxPiece = (props:any) => {
    const {name, image} = props.pieceObj;
    return (
        <Box 
        className="piece"
        border={"1px solid black"} borderRadius={"5px"} p={1} textAlign={'center'} backgroundColor={"#0cafff"}>
            <Text color={"yellow"}>{name}</Text>
            <Box>
                <img style={{ height: "55px"}} src={image} />
            </Box>
        </Box>
    )
}

export const BoxPieces = (props:any) => {
    
    let pieces = [
        { name: "Pond", image: blackPond }, { name: "Knight", image: blackKnight }, 
        { name: "Rook", image: blackRook }, { name: "Queen", image: blackQueen }, 
        { name: "Bishop", image: blackBishop }, { name: "King", image: blackKing }
    ];

    return (
        <Flex className="box-container" direction={"row"} alignItems={"center"} width={"100%"} placeItems={"center"} marginBottom={"50px"}>
            <Box>
                {pieces.map(p => <BoxPiece pieceObj={p} />)}
            </Box>
        </Flex>
    )
}

