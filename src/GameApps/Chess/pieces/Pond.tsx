import { PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackPond from "../utils/GameImages/bp.png";
import { Box, Text } from "@chakra-ui/react";
import "../pieces/BoxPiece.scss";

export class Pond extends Piece {

    constructor() { 
        super(PieceNames.POND.toString(), "wp.png")
    }

    public draw = () => {
        return <img style={{ height: "75px", marginLeft: "12px", marginTop: "5px"}} src={blackPond} />
    }
}


// Export these to another file further down maybe even name it 
// BoxPieces for menu or something to those line of thinking. 
export const BoxPiece = (props:any) => {
    return (
        <Box 
        className="piece"
        border={"1px solid black"} borderRadius={"5px"} p={1} textAlign={'center'} backgroundColor={"#0cafff"}>
            <Text color={"yellow"}>Pond</Text>
            <Box>
                <img style={{ height: "55px"}} src={blackPond} />
            </Box>
        </Box>
    )
}

// export pond, rook, bishop, queen and king