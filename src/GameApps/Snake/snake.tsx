import React from "react"
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import Canvas from "../../components/Canvas/Canvas";

export const Snake = (props:any) => {
    
    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {

    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {

    };

    let handleClick = (e:any, canvas:any, options:IOptions) => {
        
    };

    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);

    return (
        <div className="snake-container">
            <Canvas {...canvasProps} /> 
        </div>
    );
};