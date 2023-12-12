import React, { useRef, useState } from "react";
import { IAdvancedMouseDirections, useMousePositionAdvanced } from "./useMousePositionAdvanced";
import "../MouseCurserGame/styles/advanced-main.css";
import { Point } from "../../Utils/Util";

// To add to this game going to need to 
// - Add other child divs and can't allow overlap
// - Find smart technologie for drop in a array grid system
// - Calculate the position of the square in the array 
// - Add hightlights for the grid sqaure that the divRef is hovering over
// - Probably going to need to keep track of what div was selected... Going to need to create a complex object to track all this data. 
// - Then a complex way 

export const MouseCurserAdvancedComponent = (props:any) => {
    let pzRef = useRef(new Point(0, 0));
    let pzDivRef = useRef<HTMLDivElement>(null);
    let boardRef = useRef<HTMLDivElement>(null);
    let [dragging, setDrag] = useState(false);
    let mousePosition: IAdvancedMouseDirections = useMousePositionAdvanced();

    const HandleClick = () => {
        if (pzDivRef.current && boardRef.current) {
            let xDelta = mousePosition.prevXDelta ? mousePosition.prevXDelta : 0;
            let yDelta = mousePosition.prevYDelta ? mousePosition.prevYDelta : 0;
            // if you want to manipulate y-axis ->  pzRef.current.y + (yDelta / 2)

            let newXPosition = pzRef.current.x + (xDelta / 2); 
            let newYPosition = pzRef.current.y + (yDelta / 2);

            // Lines 23 & 24 Calculate the logic for a child div moving freely in a parent without leaving it's container... 
            let x = newXPosition < 0 ? pzRef.current.x 
                    : newXPosition >= boardRef.current?.clientWidth - pzDivRef.current?.clientWidth - 2 ? pzRef.current.x 
                    : newXPosition;

            let y = newYPosition < 0 ? pzRef.current.y 
                    : newYPosition >= boardRef.current.clientHeight - pzDivRef.current.clientHeight - 2 ? pzRef.current.y 
                    : newYPosition;

            // Need to add sibling overlap check as well. 

            let newPoint = new Point(x, y);
            pzRef.current = newPoint;
        }
    }

    if (dragging) {
        HandleClick();
    }

    return (
        <div className="board" ref={boardRef}>
            <div className="pz"
            ref={pzDivRef} 
            onMouseDown={(e) => { console.log(e);  setDrag(true); }}
            onMouseUp={(e) => { setDrag(false); }}
            onMouseLeave={(e) => { setDrag(false); }}
            style={{
                    position: 'relative',
                    transform: `translate(${pzRef.current.x}px, ${pzRef.current.y}px)`
                }}>
            </div>
        </div>
    )
};
