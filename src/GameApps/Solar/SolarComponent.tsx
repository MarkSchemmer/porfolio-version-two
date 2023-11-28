import React, { useEffect, useRef, useState } from "react"
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import Canvas from "../../components/Canvas/Canvas";

export const SolarComponent = (props:any) => {


    let restartGame = () => {
    };

    let handKeyDown = (e:KeyboardEvent) => {
    };

    useEffect(() => {

    });

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {

    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {
 
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => {

    };

    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);
    // can make the game go faster when needed. 
    canvasProps.options.fpsInterval.current = 100; // assign this value to state and add a dashboard to update and edit the game

    return (
        <div className="snake-container">
            <Canvas {...canvasProps} /> 
        </div>
    );
};