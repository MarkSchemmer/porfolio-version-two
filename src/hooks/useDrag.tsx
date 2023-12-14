import React, { useRef, useState } from "react";
import { Point, rectanglesIntersectingDomRect } from "../Utils/Util";

let defaultProps = new Point(0, 0);

export interface IState {
    pos: Point;
    dragging: boolean;
    rel: Point | null;
}

export let initialState: IState = {
    pos: defaultProps,
    dragging: false,
    rel: null,
};

export const useDragging = (element: React.MutableRefObject<HTMLDivElement | null>, init: IState = initialState) => {
    let [state, setState] = useState<IState>(init || initialState);
    let stateHistoryRef = useRef<IState[]>([]);

    const handleHistoryUpdate = (state: IState) => {
        if (stateHistoryRef.current.length >= 25) {
            // add to front and remove from back
            stateHistoryRef.current.pop(); // remove back. 
            stateHistoryRef.current = [ state, ...stateHistoryRef.current ]; // add to front. 
        } else {
            // add to front
            stateHistoryRef.current = [ state, ...stateHistoryRef.current ]
        }
    }

    const onMouseDown = (e: React.MouseEvent<HTMLElement>, draggablePieceRef: React.MutableRefObject<HTMLDivElement | null>) => {
        if (e.button !== 0) { return; }
        let posLeft = draggablePieceRef.current?.offsetLeft;
        let posTop = draggablePieceRef.current?.offsetTop;

        let left = posLeft ? posLeft : 0;
        let top = posTop ? posTop : 0;

        setState((prevState: IState) => {
            handleHistoryUpdate(prevState);
            return {
                ...prevState,
                dragging: true,
                rel: new Point(
                    e.pageX - left,
                    e.pageY - top
                ),

            }
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseUp = (e:  React.MouseEvent<HTMLElement>) => {
        setState((prevState: IState) => ({...prevState, dragging: false}));
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseLeave = (e:  React.MouseEvent<HTMLElement>) => {
        setState((prevState: IState) => ({...prevState, dragging: false}));
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>, ID: string) => {
        if (state.dragging === false) { return; }
        let x = state.rel?.x ? state.rel.x : 0;
        let y = state.rel?.y ? state.rel.y : 0;
        // The question we need to know this simple ansewer...
        // 1. Does e.pageX - x breach the parent container... 
        // 2. Does e.pageY - y breach the parent container... 
        let newPoint = new Point(
            e.pageX - x,
            e.pageY - y
        );

        // We hand boundry just right... 
        let p = DoesPieceBreakBoundriesOfParent(newPoint, child, parent);

        setState((prevState:IState) => {
            handleHistoryUpdate(prevState)
            return {
                ...prevState,
                pos: new Point(p.x, p.y)
            };
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const DoesPieceBreakBoundriesOfParent = (p: Point, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {

        if (child.current && parent.current) {
            
            const pieceResolution = child.current.getBoundingClientRect();
            const boardResolution = parent.current?.getBoundingClientRect();

            let x = p.x < 0 ? 0 : p.x + pieceResolution.width >= boardResolution.width - 2 ? boardResolution.width - pieceResolution.width - 2 : p.x;
            let y = p.y < 0 ? 0 : p.y + pieceResolution.height >= boardResolution.height - 2 ? boardResolution.height - pieceResolution.height - 2 : p.y;
            // Logic here so it can't intersect with any siblings. 
            // loop siblings, and compare to the current ID. 
            // with all the others, then do a similar transformation to 
            // the parent child to -> child - child 
            return new Point(
                x, y
            );
        }

        return p;
    }

    const getChildID = (child: React.MutableRefObject<HTMLDivElement | null>) => {
        if (child.current)
            return child.current?.className.split(" ")[1].trim();
        else 
            return "null";
    }


    const getSiblings = (childId: string) => {
        return Array.from(document.getElementsByClassName("pz"))
            .filter((e: Element) => !e.className.includes(childId));
    }

    const DoesPieceBreakBoundrisOfSiblings = (child: React.MutableRefObject<HTMLDivElement | null>, ID: string) => {
        
        if (child.current) {
            let childRect = child.current.getBoundingClientRect();
            let childId = child.current?.className.split(" ")[1].trim();
            let siblings = Array.from(document.getElementsByClassName("pz"))
                            .filter((e: Element) => !e.className.includes(childId));

            return siblings.some((e: Element) => {
                let sibRect = e.getBoundingClientRect();
                
                let res = rectanglesIntersectingDomRect(childRect, sibRect);
                if (res) { }

                return res;
            });
        }
    };

    return {
        state: state,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave
    };
};
