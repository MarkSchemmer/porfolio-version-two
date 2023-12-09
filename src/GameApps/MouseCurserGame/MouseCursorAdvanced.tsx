import React, { useEffect } from "react";
import { useMousePosition } from "./useMousePosition";
import { Dot } from "./Dot";
import { useDelayedStateExecution } from "./useDelayedStateExecution";
import { IAdvancedMouseDirections, useMousePositionAdvanced } from "./useMousePositionAdvanced";
import { useDelayedStateExecutionAdvanced } from "./useDelayedStateExecutionAdvanced";

export const MouseCurserAdvancedComponent = (props:any) => {

    let mousePosition: IAdvancedMouseDirections = useMousePositionAdvanced();
    let mousePosition2: IAdvancedMouseDirections = useDelayedStateExecutionAdvanced(mousePosition, 350);

    if (mousePosition2) {
        // console.log(
        //     "Prev X -> " + mousePosition2.prevX
        // );

        // console.log(
        //     "Next X -> " + mousePosition.currentX
        // );
        // console.log(

        // )
        // console.log(
        //     "Distance -> " + mousePosition.distance
        // );
    }

    return (
        <div>

        </div>
    )
};
