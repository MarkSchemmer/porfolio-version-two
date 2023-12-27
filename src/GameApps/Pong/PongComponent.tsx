import React, { useEffect, useRef, useState } from "react"
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import Canvas from "../../components/Canvas/Canvas";
import "../Pong/styles/main.css";
import { PaddleBoard, PongGameController } from "./pong";
import { Point } from "../../Utils/Util";

/*
    After implemented ai, maybe it mihgt be a good idea to lift up state in an object

    Then I can set state and updated state, re-render the component but pass the state object 

    to my game objects, yes refreshing all the objects but, it will guarantee that 

    at least the proper data get's rendered. 
*/

export const PongComponent = (props:any) => {
    let leftScoreRef = useRef(0);
    let rightScoreRef = useRef(0);

    useEffect(() => {
        window.addEventListener("keydown", gameController.handleKeyDown);
        window.addEventListener("keyup", gameController.handleKeyUp);
        return () => {
            window.removeEventListener("keydown", gameController.handleKeyDown);
            window.removeEventListener("keyup", gameController.handleKeyUp);
        }
    }, []);

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

        if (leftScoreRef.current != gameController.leftPaddleScore) {
            // console.log("updating ref left");
            leftScoreRef.current = gameController.leftPaddleScore;
        }

        if (rightScoreRef.current != gameController.rightPaddleScore) {
            // console.log("updating ref right. ");
            rightScoreRef.current = gameController.rightPaddleScore;
            // console.log(rightScoreRef.current);
        }
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => { };
    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);
    let gameController = new PongGameController(canvasProps.pausegame, canvasProps.startgame, canvasProps.options.canvasRef);

    // can make the game go faster when needed. 
    canvasProps.options.fpsInterval.current = 5; // assign this value to state and add a dashboard to update and edit the game
    canvasProps.options.runner.current = true;

    return (
        <div className="pong-container">
            <ScoreBox leftScore={leftScoreRef.current} rightScore={rightScoreRef.current} />
            <Canvas {...canvasProps} /> 
        </div>
    );
};

export const ScoreBox = (props:any) => {
    console.log(props.leftScore);
    return (
    <div className="scores">
        <div>Left Score - {props.leftScore}</div>
        <div>Right Score - {props.rightScore}</div>
    </div>
    )
}