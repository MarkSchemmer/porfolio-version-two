import React, { useEffect, useRef, useState } from "react";
import { Point, rectanglesIntersectingDomRect, rectanglesIntersectingDomRectWithPoint } from "../Utils/Util";
import { IAdvancedMouseDirections, XAxisMovement, YAxisMovement, distanceFormula, initialData, useMousePositionAdvanced, whichDirectionXAxis, whichDirectionYAxis } from "../GameApps/MouseCurserGame/useMousePositionAdvanced";
import { handleClickForGridCoordinates } from "../GameApps/puzzleDrag/PuzzleDrag";

let defaultProps = new Point(0, 0);

export interface IState {
    pos: Point;
    dragging: boolean;
    rel: Point | null;
    lastSavedPos: Point;
    moveX: boolean | null;
    moveY: boolean | null;
}

export let initialState: IState = {
    pos: defaultProps,
    dragging: false,
    rel: null,
    lastSavedPos: defaultProps,
    moveX: null,
    moveY: null
};

export const useDragging = (element: React.MutableRefObject<HTMLDivElement | null>, init: IState = initialState) => {
    let [state, setState] = useState<IState>(init || initialState);

    const onMouseDown = (e: React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>) => {
        if (e.button !== 0) { return; }
        let posLeft = child.current?.offsetLeft;
        let posTop = child.current?.offsetTop;

        let left = posLeft ? posLeft : 0;
        let top = posTop ? posTop : 0;

        setState((prevState: IState) => {
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

    const handleIfDropLocationIsValid = (child: React.MutableRefObject<HTMLDivElement | null>, p?: Point) => {
        let currentPosition = state.pos;
        let shouldUpdatetoNewPosition = DoesPieceBreakBoundrisOfSiblings(child);
        setState((prevState: IState) => ({
            ...prevState,
            moveX: null, moveY: null, 
            pos: shouldUpdatetoNewPosition ? prevState.lastSavedPos : p ? p : prevState.pos, 
            lastSavedPos: shouldUpdatetoNewPosition ? prevState.lastSavedPos : currentPosition, 
            dragging: false}));
    }

    const onMouseUp = (e:  React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {
        let [x, y] = handleClickForGridCoordinates(e, parent.current)
        console.log(`${x * 152}-${Math.ceil(y * 151.5)}`);
        let p = new Point(Math.ceil(x*152), Math.ceil(y*152));
        handleIfDropLocationIsValid(child, p);
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseLeave = (e:  React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {
        handleIfDropLocationIsValid(child);
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

        // if (parent.current && child.current) {
        //     console.log(
        //         (state.pos.x + child.current.getBoundingClientRect().width) 
        //     );
        // }


        setState((prevState:IState) => {
            let moveX = prevState.moveX === null && prevState.moveY === null ? !(prevState.pos.x === p.x) : prevState.moveX;
            let moveY = prevState.moveX === null && prevState.moveY === null ? !moveX : prevState.moveY;
            return {
                ...prevState,
                moveX,
                moveY,
                pos: new Point(moveX ? p.x : prevState.pos.x, moveY ? p.y : prevState.pos.y)
            };
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const DoesPieceBreakBoundriesOfParent = (p: Point, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {

        if (child.current && parent.current) {
            
            const pieceResolution = child.current.getBoundingClientRect();
            const boardResolution = parent.current?.getBoundingClientRect();

            let x = p.x < 0 ? 0 : p.x + pieceResolution.width > boardResolution.width ? Math.floor(boardResolution.width - pieceResolution.width) - 2 : p.x;
            let y = p.y < 0 ? 0 : p.y + pieceResolution.height > boardResolution.height ? Math.floor(boardResolution.height - pieceResolution.height) - 2 : p.y;
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

    const DoesPieceBreakBoundrisOfSiblings = (child: React.MutableRefObject<HTMLDivElement | null>) => {
        
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

    const DoesPieceBreakBoundrisOfSiblingsUsingNewPoint = (child: React.MutableRefObject<HTMLDivElement | null>, point: Point) => {
        
        if (child.current) {
            let childRect = child.current.getBoundingClientRect();
            let childId = child.current?.className.split(" ")[1].trim();
            let siblings = Array.from(document.getElementsByClassName("pz"))
                            .filter((e: Element) => !e.className.includes(childId));

            return siblings.some((e: Element) => {
                let sibRect = e.getBoundingClientRect();
                
                let res = rectanglesIntersectingDomRectWithPoint(point, sibRect);
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
