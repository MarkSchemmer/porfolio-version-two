import React, { useEffect, useRef, useState } from "react";
import { Point } from "../Utils/Util";

let defaultProps = new Point(0, 0);

interface IState {
    pos: Point;
    dragging: boolean;
    rel: Point | null;
}

let initialState = {
    pos: defaultProps,
    dragging: false,
    rel: null
};

export const useDragging = (element: HTMLDivElement) => {
    let [state, setState] = useState<IState>(initialState);
    let draggablePieceRef = useRef<HTMLDivElement | null>(element);

    useEffect(() => {

        let ran = false;

        const runner = () => {
            if (ran === false) {
                document.addEventListener("mouseup", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            }
        };

        runner();


        return () => {
            ran = true;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    }, []);

    const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) { return; }
        let pos = draggablePieceRef.current?.getBoundingClientRect();
        let left = pos && pos.left ? pos.left : 0;
        let top = pos && pos.top ? pos.top : 0;
        setState((prevState: IState) => {
            return {
                ...prevState,
                dragging: true,
                rel: new Point(
                    e.pageX - left,
                    e.pageY - top
                )
            }
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseUp = (e: MouseEvent) => {
        setState((prevState: IState) => ({...prevState, dragging: false}));
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (state.dragging === false) { return; }
        let x = state.rel?.x ? state.rel.x : 0;
        let y = state.rel?.y ? state.rel.y : 0;
        setState((prevState:IState) => ({
            ...prevState,
            pos: new Point(
                e.pageX - x,
                e.pageY - y
            )
        }));

        e.stopPropagation();
        e.preventDefault();
    };


    return {
        state: state,
        onMouseDown
    };
};