import React, { useRef } from "react";
import "../MouseCurserGame/styles/advanced-main.css";
import { Point } from "../../Utils/Util";
import { initialState, useDragging } from "../../hooks/useDrag";

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

export const MouseCurserAdvancedComponent = (props:any) => {
    let boardRef = useRef<HTMLDivElement>(null);
    let pzDivRefTwo = useRef<HTMLDivElement>(null);

    let pzTwoDrag = useDragging(boardRef, {...initialState, pos: new Point(152, 0)});

    let pzDivRef = useRef<HTMLDivElement>(null);
    let { state, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useDragging(boardRef);

    return (
        <div className="board" style={{
            position: "absolute",
            left: "40%"
        }} ref={boardRef}>

            <div className="pz"
                ref={pzDivRef} 
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => { onMouseDown(e, pzDivRef); }}
                onMouseMove={(e:  React.MouseEvent<HTMLElement>) => { onMouseMove(e, pzDivRef, boardRef); }}
                onMouseUp={(e:  React.MouseEvent<HTMLElement>) => { onMouseUp(e); }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { onMouseLeave(e); }}
                style={{
                        position: "absolute",
                        left: `${state.pos.x}px`,
                        top: `${state.pos.y}px`
                    }}>
            </div>

            <div 
            ref={pzDivRefTwo}
            className="pz"
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => { pzTwoDrag.onMouseDown(e, pzDivRefTwo); }}
            onMouseMove={(e:  React.MouseEvent<HTMLElement>) => { pzTwoDrag.onMouseMove(e, pzDivRefTwo, boardRef); }}
            onMouseUp={(e:  React.MouseEvent<HTMLElement>) => { pzTwoDrag.onMouseUp(e); }}
            onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { pzTwoDrag.onMouseLeave(e); }}
            style={{
                backgroundColor: "blue",
                position: "absolute",
                left: `${pzTwoDrag.state.pos.x}px`,
                top: `${pzTwoDrag.state.pos.y}px`
            }}>
            </div>
        </div>
    )
};
