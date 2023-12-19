import React, { useState } from "react";
import { ArePointsEqual, GetDeltaX, GetXDirection, Point, rectanglesIntersectingDomRect, rectanglesIntersectingDomRectWithPoint } from "../Utils/Util";
import { handleClickForGridCoordinates } from "../GameApps/puzzleDrag/PuzzleDrag";
import { flushSync } from "react-dom";

let defaultProps = new Point(0, 0);

export interface IState {
    pos: Point;
    dragging: boolean;
    rel: Point | null;
    lastSavedPos: Point;
    moveX: boolean | null;
    moveY: boolean | null;
    coordinates: {
        prevCoordinate: Point | null,
        coordinate: Point | null,
        currentPoint: Point | null,
        prevPoint: Point | null
      }
}

export let initialState: IState = {
    pos: defaultProps,
    dragging: false,
    rel: null,
    lastSavedPos: defaultProps,
    moveX: null,
    moveY: null,
    coordinates: {
        prevCoordinate: null,
        coordinate: null,
        currentPoint: null, prevPoint: null
      }
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

    const handleIfDropLocationIsValid = (e:  React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, p?: Point | undefined) => {
        let currentPosition = state.pos;
        let shouldUpdatetoNewPosition = DoesPieceBreakBoundrisOfSiblings(child);

        flushSync(() => {
            setState((prevState: IState) => ({
                ...prevState,
                moveX: null, moveY: null, 
                pos: shouldUpdatetoNewPosition ? (p?p:prevState.lastSavedPos) : p ? p : prevState.pos, 
                lastSavedPos: shouldUpdatetoNewPosition ? prevState.lastSavedPos : currentPosition, 
                dragging: false}));
        })

    }

    const handleIfDropLocationIsValidWithoutE = () => { 
        flushSync(() => {
            setState((prevState: IState) => ({
                ...prevState,
                pos: new Point(determineSectionInXAxis(prevState.pos.x), determineSectionInYAxis(prevState.pos.y))
            }));
        })
    }

    const handleIfDropLocationIsValidAndStopDragging = () => { 
        flushSync(() => {
            setState((prevState: IState) => ({
                ...prevState,
                dragging: false,
                pos: new Point(determineSectionInXAxis(prevState.pos.x), determineSectionInYAxis(prevState.pos.y))
            }));
        })
    }

    const determineSectionInXAxis = (x: number) => {
        return  x >= 304 - 75 ? 304 : 
                x >= 152 - 75 ? 152 : 
                0; 
    }

    const determineSectionInYAxis = (y: number) => {
        return y >= (456 - 75) ? 456 :
               y >= (304 - 75) ? 304 : 
               y >= (152 - 105) ? 152 : 
               0; 
    }

    const onMouseUp = (e:  React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {
        let [x, y] = handleClickForGridCoordinates(e, parent.current)
        //console.log(`${x * 152}-${y * 152}`);
        let additionalXMovement = Math.floor(e.pageX - (child.current?.getBoundingClientRect().x || 0));
        let additionalYMovement = Math.floor(e.pageY - (child.current?.getBoundingClientRect().y || 0));
        //console.log(`${x} - ${y}`);
        let p = new Point(determineSectionInXAxis((x*152)), determineSectionInYAxis(Math.ceil(y*152)));


        /*
        
            if moveX is true then we are moving X

            if moveY is true then we are moving y


            we need to check if the current location of the new point is going to intersect... 


            if it is we need to change go back or forwards 

            What are the 3 sections of x -> 0 - 152 - 304

            Note 0 is left side and 152 is 
        
        */



        // console.log(`${state.moveX} - ${state.moveY}`);
      
        handleIfDropLocationIsValid(e, child, p);
    
       
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseLeave = (e:  React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>) => {
        let p: Point | undefined = undefined;
        // if (state.dragging) {
        //     let [x, y] = handleClickForGridCoordinates(e, parent.current)
        //     //console.log(`${x * 152}-${y * 152}`);
        //     let additionalXMovement = Math.floor(e.pageX - (child.current?.getBoundingClientRect().x || 0));
        //     let additionalYMovement = Math.floor(e.pageY - (child.current?.getBoundingClientRect().y || 0));
        //     //console.log(`${x} - ${y}`);
        //     p = new Point(determineSectionInXAxis((x*152)), determineSectionInYAxis(Math.ceil(y*152)));
        //     //console.log(p);
        // }

        
        handleIfDropLocationIsValid(e, child, p);

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent<HTMLElement>, child: React.MutableRefObject<HTMLDivElement | null>, parent: React.MutableRefObject<HTMLDivElement | null>, ID: string) => {
        if (state.dragging === false) {
            e.stopPropagation();
            e.preventDefault();
            return; 
        }
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

        if (state.dragging) {
            

                let shouldUpdatetoNewPosition = DoesPieceBreakBoundrisOfSiblings(child);

                if (shouldUpdatetoNewPosition) {
                    //console.log("intersecting X");
                    handleIfDropLocationIsValidAndStopDragging();
                    return;
                }


                setState((prevState:IState) => {
                    let deltaX = GetDeltaX(newPoint, prevState.coordinates.prevPoint);
                    // if (child.current) {
                    //     let ch = child.current.getBoundingClientRect();

                    //     console.log(ch.x - e.pageX);
                    // }
                    let moveX = prevState.moveX === null && prevState.moveY === null ? !(prevState.pos.x === p.x) : prevState.moveX;
                    let moveY = prevState.moveX === null && prevState.moveY === null ? !moveX : prevState.moveY;
                    let [x, y] = handleClickForGridCoordinates(e, parent.current);
                    // console.log("Previous Point: ", prevState.coordinates.prevPoint?.x);
                    // console.log("Current Point: ", newPoint.x);
                    if (moveX) {
                        // console.log(
                        //     GetXDirection(GetDeltaX(newPoint, prevState.coordinates.prevPoint))
                        // );
                    }

                    return {
                        ...prevState,
                        moveX,
                        moveY,
                        pos: new Point(moveX ? p.x : prevState.pos.x, moveY ? p.y : prevState.pos.y),
                        coordinates: {
                            prevCoordinate: prevState.coordinates.coordinate,
                            coordinate: new Point(x, y),
                            prevPoint: !ArePointsEqual(newPoint, prevState.coordinates.prevPoint) 
                                       ? prevState.coordinates.currentPoint : prevState.coordinates.prevPoint,
                            currentPoint: newPoint
                        }
                    };
                });

        }


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

            return siblings.filter((e: Element) => {
                let sibRect = e.getBoundingClientRect();
                
                let res = rectanglesIntersectingDomRectWithPoint(point, sibRect);
                if (res) { }

                return res;
            });
        }

        return [];
    };


    return {
        state: state,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
        handleIfDropLocationIsValid,
        handleIfDropLocationIsValidWithoutE
    };
};
