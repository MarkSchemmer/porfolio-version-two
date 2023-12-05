import React, { useEffect, useState } from "react";
import { Point } from "../../Utils/Util";

export const useDelayedStateExecution = (initialState:any, delay: number) => {
    const [state, setState] = useState(new Point(0, 0));

    useEffect(() => {
        setTimeout(() => {
            setState(initialState);
        }, delay);
    }, [initialState, delay]);

    // state is the delayed state. 
    return state;
}