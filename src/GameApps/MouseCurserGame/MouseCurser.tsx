import React, { useEffect } from "react";
import { useMousePosition } from "./useMousePosition";
import { Dot } from "./Dot";
import { useDelayedStateExecution } from "./useDelayedStateExecution";

export const MouseCurserComponent = (props:any) => {

    let mousePosition = useMousePosition();
    let position2nd = useDelayedStateExecution(mousePosition, 400);
    let position3rd = useDelayedStateExecution(position2nd, 400);
    let position4th = useDelayedStateExecution(position3rd, 800);

    return (
        <div>
            {mousePosition.x} - {mousePosition.y}
            <Dot opacity={0.9} postion={mousePosition} bkC="red" /> 
            <Dot opacity={0.8} postion={position2nd} bkC="blue" /> 
            <Dot opacity={0.7} postion={position3rd} bkC="orange" />
            <Dot opacity={0.6} postion={position4th} bkC="purple" /> 
        </div>
    )
};
