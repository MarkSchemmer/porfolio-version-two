import React, { useRef } from "react";
import "../MouseCurserGame/styles/advanced-main.css";
import { Point } from "../../Utils/Util";
import { initialState, useDragging } from "../../hooks/useDrag";
import { PuzzlePiece } from "./PuzzlePiece";

// To add to this game going to need to 
// - Add other child divs and can't allow overlap
// - Find smart technologie for drop in a array grid system
// - Calculate the position of the square in the array 
// - Add hightlights for the grid sqaure that the divRef is hovering over
// - Probably going to need to keep track of what div was selected... Going to need to create a complex object to track all this data. 
// - Then a complex way 

//console.log(state.pos.x + pieceResolution.width);
//console.log(res.width);
// just add 152 to x to see if great than boardRef width. -> state.pos.x + 152(pieceRef.width) >= res.width
// if You want determine the left side just take "pos.x >= 0"
// These two conditions for x will keep it in the width of the board. 
// Need to create this same equation for Y-axis. 



export const PuzzleDrag = (props:any) => {
    let boardRef = useRef<HTMLDivElement>(null);
    return (
        <div className="board" style={{
            position: "absolute",
            left: "40%"
        }} ref={boardRef}>
            <PuzzlePiece boardRef={boardRef} /> 
            <PuzzlePiece 
            initialProps={{...initialState, pos: new Point(initialState.pos.x + 152, initialState.pos.y)}}
            boardRef={boardRef} 
            styleProps={{backgroundColor: "blue"}} /> 
        </div>
    )
};
