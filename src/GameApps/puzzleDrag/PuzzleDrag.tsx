import React, { useRef } from "react";
import "../puzzleDrag/styles/main.css";
import { Point, e2 } from "../../Utils/Util";
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

export const baseSquare = [
    [ "blue", "green", "yellow" ],
    [ "orange", "purple", "red" ],
    [ "grey", "#AAF5EC", "#F5AADB" ]
];

export const PuzzleDrag = (props:any) => {
    let boardRef = useRef<HTMLDivElement>(null);

    let squares = baseSquare.map((row, x) => {
        return row.map((c, y) => ({ boardRef, ID: e2(), styleProps: {backgroundColor: c}, initialProps: {...initialState, pos: new Point(152 * x, 152 * y)} }));
    })
    .reduce(
        (acc, cur) => { return [ ...acc, ...cur ]; }, []
    );

    return (
        <div className="board" style={{
            position: "absolute",
            left: "40%"
        }} ref={boardRef}>
            {squares.map((i => {
                return (<PuzzlePiece 
                key={i.ID} 
                ID={i.ID} 
                boardRef={boardRef} 
                styleProps={i.styleProps} 
                initialProps={i.initialProps} />);
            }))}
        </div>
    )
};
