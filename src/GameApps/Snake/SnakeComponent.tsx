import React, { useEffect, useRef } from "react"
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import Canvas from "../../components/Canvas/Canvas";
import { Snake } from "./snake";

export const SnakeComponent = (props:any) => {
    // needing to create a snake as a ref. 
    // Needing to assign a onkeydown event to the window so we can capture key press. 
    // so we can control the snake and or restart the game.
    let snakeRef = useRef(new Snake(50, 50));
    let handKeyDownRef = useRef();
    let handKeyDown = (e:KeyboardEvent) => {
        let valuePressed = e.key.toString().toLowerCase();
        if (valuePressed === "arrowright") { snakeRef.current.GoRight(); } 
        else if (valuePressed === "arrowleft") { snakeRef.current.GoLeft(); }
        else if (valuePressed === "p") { canvasProps.pausegame(); }
        else if (valuePressed === "s") { canvasProps.startgame(); }
        // else if (valuePressed === "arrowup") { snakeRef.current.GoUp(); } 
        // else if (valuePressed === "arrowdown") { snakeRef.current.GoDown(); }
    } 

    useEffect(() => {
        window.addEventListener("keydown", handKeyDown);

        return () => {
            window.removeEventListener("keydown", handKeyDown);
        }
    })

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {
        // draw snake
        snakeRef.current.draw(ctx);
    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {
        snakeRef.current.body = snakeRef.current.snakeCalculation();
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => {
        options.runner.current = true;
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