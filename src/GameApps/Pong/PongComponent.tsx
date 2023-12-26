import React, { useEffect } from "react"
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import Canvas from "../../components/Canvas/Canvas";
import "../Pong/styles/main.css";
import { PaddleBoard, PongGameController } from "./pong";
import { Point } from "../../Utils/Util";

export const PongComponent = (props:any) => {

    useEffect(() => {
        window.addEventListener("keydown", gameController.handleKeyDown);
        window.addEventListener("keyup", gameController.handleKeyUp);
        return () => {
            window.removeEventListener("keydown", gameController.handleKeyDown);
            window.removeEventListener("keyup", gameController.handleKeyUp);
        }
    });

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => { 
        gameController.leftPaddle.drawPaddle(ctx);
        gameController.rightPaddle.drawPaddle(ctx);
        gameController.ball.drawSolid(ctx);
    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => { 
        // if (options.canvasRef.current) {
        //     console.log("hello");
        //     gameController.boardRef = options.canvasRef;
        // }
        gameController.handleCalculation(options.canvasRef);
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => { };
    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);
    let gameController = new PongGameController(canvasProps.pausegame, canvasProps.startgame, canvasProps.options.canvasRef);

    // can make the game go faster when needed. 
    canvasProps.options.fpsInterval.current = 5; // assign this value to state and add a dashboard to update and edit the game
    canvasProps.options.runner.current = true;
    return (
        <div className="pong-container">
            <Canvas {...canvasProps} /> 
        </div>
    );
};