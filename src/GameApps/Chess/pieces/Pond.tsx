import { PieceNames } from "../utils/Utils";
import { Piece } from "./Piece";
import blackPond from "../utils/GameImages/bp.png";

export class Pond extends Piece {

    constructor() { 
        super(PieceNames.POND.toString(), "wp.png")
    }

    public draw = () => {
        return <img src={blackPond} />
    }
}