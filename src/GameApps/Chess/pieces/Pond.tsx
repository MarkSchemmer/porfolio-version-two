import { PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackPond from "../utils/GameImages/bp.png";

export class Pond extends Piece {

    constructor() { 
        super(PieceNames.POND.toString(), "wp.png")
    }

    public draw = () => {
        return <img style={{ height: "75px", marginLeft: "12px", marginTop: "5px"}} src={blackPond} />
    }
}