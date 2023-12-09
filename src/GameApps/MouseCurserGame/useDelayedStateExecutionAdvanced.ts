import React, { useEffect, useState } from "react";
import { Point } from "../../Utils/Util";

export const useDelayedStateExecutionAdvanced = (initialState:any, delay: number) => {
    const [state, setState] = useState({} as any);

    useEffect(() => {
        let i = setTimeout(() => {
            setState(initialState);
        }, delay);


    }, [initialState, delay]);

    // state is the delayed state. 
    return state;
}