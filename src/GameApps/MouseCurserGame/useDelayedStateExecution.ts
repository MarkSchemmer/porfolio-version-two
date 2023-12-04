import React, { useState } from "react";
import { Point } from "../../Utils/Util";

export const useDelayedStateExecution = (initialState:any, delay: number) => {
    const [state, setState] = useState(new Point(0, 0));

    setTimeout(() => {
        setState(initialState);
    }, delay);

    return state;
}