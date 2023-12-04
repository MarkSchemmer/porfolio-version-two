import React from "react";
import { Point } from "../../Utils/Util";

interface IProps {
    opacity: number;
    postion: Point;
    bkC: string;
}

export const Dot = (props:IProps) => {
    return (
        <div style={{
            width: '20px',
            height: '20px',
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            borderRadius: '50%',
            backgroundColor: props.bkC,
            opacity: props.opacity,
            transform: `translate(${props.postion.x}px, ${props.postion.y}px)`
        }}>
        </div>
    );
}