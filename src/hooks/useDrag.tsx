import React, { useState } from "react";
import { Point, getSidesOfRectForCompare, rectanglesIntersectingDomRect } from "../Utils/Util";

let defaultProps = new Point(0, 0);

export interface IState {
    pos: Point;
    dragging: boolean;
    rel: Point | null;
}

export let initialState: IState = {
    pos: defaultProps,
    dragging: false,
    rel: null
};

export const useDragging = (element: React.MutableRefObject<HTMLDivElement | null>, init: IState = initialState) => {
    let [state, setState] = useState<IState>(init || initialState);

    const onMouseDown = (e: React.MouseEvent<HTMLElement>, draggablePieceRef: React.MutableRefObject<HTMLDivElement | null>) => {
        if (e.button !== 0) { return; }
        let posLeft = draggablePieceRef.current?.offsetLeft;
        let posTop = draggablePieceRef.current?.offsetTop;

        let left = posLeft ? posLeft : 0;
        let top = posTop ? posTop : 0;

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


        // TODO NEED TO FIX THIS METHOD AND WHILE LOOP BORKEN
        // NEED TO DO CALCULATIONS BASED ON A POINT NOT THE CHILD RECT. !!!!!!!!
        // if (DoesPieceBreakBoundrisOfSiblings(child, ID)){
        //     while (DoesPieceBreakBoundrisOfSiblings(child, ID)) {
        //         console.log("hit again");
        //         p.x += 1;
        //     }
        // }
       

        setState((prevState:IState) => {
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

    const DoesPieceBreakBoundrisOfSiblings = (child: React.MutableRefObject<HTMLDivElement | null>, ID: string) => {
        
        if (child.current) {
            let childRect = child.current.getBoundingClientRect();
            let childId = child.current?.className.split(" ")[1].trim();
            let siblings = Array.from(document.getElementsByClassName("pz"))
                            .filter((e: Element) => !e.className.includes(childId));

            return siblings.some((e: Element) => {
                let sibRect = e.getBoundingClientRect();
                
                let res = rectanglesIntersectingDomRect(childRect, sibRect);
                if (res) {
                    // console.log(sibRect.right);
                    // console.log(childRect.left);
                    // console.log(childRect.left - sibRect.right);

                }

                return res;
                    /*
                    
                    dive into the implementation details and see how we can create this functionality in JavaScript.

 
  
                        function moveElementsOnDrag(draggableElement) {
                            const draggableRect = draggableElement.getBoundingClientRect();
                            const draggableCenterX = draggableRect.left + draggableRect.width / 2;
                            const draggableCenterY = draggableRect.top + draggableRect.height / 2;
                        
                            const elementsToMove = document.querySelectorAll('.draggable');
                            elementsToMove.forEach(element => {
                                if (element !== draggableElement) {
                                    const elementRect = element.getBoundingClientRect();
                                    const elementCenterX = elementRect.left + elementRect.width / 2;
                                    const elementCenterY = elementRect.top + elementRect.height / 2;
                        
                                    const distanceX = draggableCenterX - elementCenterX;
                                    const distanceY = draggableCenterY - elementCenterY;
                        
                                    const overlapX = Math.max(0, (elementRect.width + draggableRect.width) / 2 - Math.abs(distanceX));
                                    const overlapY = Math.max(0, (elementRect.height + draggableRect.height) / 2 - Math.abs(distanceY));
                        
                                    const moveX = distanceX > 0 ? overlapX : -overlapX;
                                    const moveY = distanceY > 0 ? overlapY : -overlapY;
                        
                                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                                }
                            });
                        }
                    
                    
                    */

                        // const draggableCenterX = childRect.left + childRect.width / 2;
                        // const draggableCenterY = childRect.top + childRect.height / 2;

                        // const elementCenterX = sibRect.left + sibRect.width / 2;
                        // const elementCenterY = sibRect.top + sibRect.height / 2;
            
                        // const distanceX = draggableCenterX - elementCenterX;
                        // const distanceY = draggableCenterY - elementCenterY;
            
                        // const overlapX = Math.max(0, (sibRect.width + childRect.width) / 2 - Math.abs(distanceX));
                        // const overlapY = Math.max(0, (sibRect.height + childRect.height) / 2 - Math.abs(distanceY));
            
                        // const moveX = distanceX > 0 ? overlapX : -overlapX;
                        // const moveY = distanceY > 0 ? overlapY : -overlapY;

                        // console.log(p.x);
                        // console.log(moveX);

                        // console.log(p.x + moveX);

                        // p.x += moveX;
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