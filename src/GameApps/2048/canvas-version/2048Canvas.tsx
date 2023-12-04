import React, { useEffect, useRef, useState } from "react"
import { IOptions, boardConfigurationsDefault } from "../../../components/Canvas/CanvasProps";
import { useCanvasProps } from "../../../components/Canvas/useCanvasProps";
import Canvas from "../../../components/Canvas/Canvas";
import { TwentyFortyEightBoard } from "../utils/utils";

export const TwentyFortyEightComponent = (props:any) => {

    // Create the board, using the useRef

    let twentyFortyEightBoardRef = useRef(new TwentyFortyEightBoard());

    useEffect(() => {

        document.addEventListener("keydown", twentyFortyEightBoardRef.current.handleArrowKeyPress);

        return () => {
            document.removeEventListener("keydown", twentyFortyEightBoardRef.current.handleArrowKeyPress);
        }
    }, [])

    let restartGame = () => {

    };

    let handKeyDown = (e:KeyboardEvent) => {

    };

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {
        twentyFortyEightBoardRef.current.draw(ctx);
    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => {

    };

    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);
    canvasProps.options.runner.current = true;
    canvasProps.options.fpsInterval.current = 100; // interval for update, for calculation and drawing.
    return (
        <div className="snake-container">
            <Canvas {...canvasProps} /> 
        </div>
    );
};