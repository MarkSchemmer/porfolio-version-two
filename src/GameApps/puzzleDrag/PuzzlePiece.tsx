import React, { useRef } from "react";
import { IState, useDragging } from "../../hooks/useDrag";

export interface IPuzzlePiece {
    boardRef: React.RefObject<HTMLDivElement>;
    styleProps?: React.CSSProperties;
    initialProps?: IState
};

export const PuzzlePiece = (props:IPuzzlePiece) => {

    let pzDivRef = useRef<HTMLDivElement>(null);
    let { state, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useDragging(props.boardRef, props.initialProps);

    const pieceStyles: React.CSSProperties = {
            position: "absolute",
            left: `${state.pos.x}px`,
            top: `${state.pos.y}px`,
            ...(props.styleProps || {})
    }

    return (
        <div className="pz"
            ref={pzDivRef} 
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => { onMouseDown(e, pzDivRef); }}
            onMouseMove={(e:  React.MouseEvent<HTMLElement>) => { onMouseMove(e, pzDivRef, props.boardRef); }}
            onMouseUp={(e:  React.MouseEvent<HTMLElement>) => { onMouseUp(e); }}
            onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { onMouseLeave(e); }}
            style={pieceStyles}>
        </div>
    );
}