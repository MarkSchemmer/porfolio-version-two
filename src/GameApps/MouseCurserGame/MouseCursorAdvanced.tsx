import React, { useEffect, useRef, useState } from "react";
import { useMousePosition } from "./useMousePosition";
import { Dot } from "./Dot";
import { useDelayedStateExecution } from "./useDelayedStateExecution";
import { IAdvancedMouseDirections, useMousePositionAdvanced } from "./useMousePositionAdvanced";
import { useDelayedStateExecutionAdvanced } from "./useDelayedStateExecutionAdvanced";
import "../MouseCurserGame/styles/advanced-main.css";
import { Point } from "../../Utils/Util";

export const MouseCurserAdvancedComponent = (props:any) => {
    let pzRef = useRef(new Point(0, 0));
    let [dragging, setDrag] = useState(false);
    let mousePosition: IAdvancedMouseDirections = useMousePositionAdvanced();
    // let delayedPosition: IAdvancedMouseDirections = useDelayedStateExecutionAdvanced(mousePosition, 15);

    const HandleClick = () => {
            let xDelta = mousePosition.prevXDelta ? mousePosition.prevXDelta : 0;
            let yDelta = mousePosition.prevYDelta ? mousePosition.prevYDelta : 0;
            // console.log(xDelta)
            // console.log(pzRef.current.x);
            // pzRef.current.y + (yDelta / 2)
            let newPoint = new Point(pzRef.current.x + (xDelta / 2), 0);
            pzRef.current = newPoint;
    }


    if (dragging) {
        HandleClick();
    }


    return (
        <div className="board">
            <div className="pz" 
            onMouseDown={(e) => { console.log(e);  setDrag(true); }}
            onMouseUp={(e) => { setDrag(false); }}
            style={{transform: `translate(${pzRef.current.x}px, ${pzRef.current.y}px)`}}>
            </div>
        </div>
    )
};
