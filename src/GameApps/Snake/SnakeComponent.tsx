import React, { useEffect, useRef, useState } from "react"
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import Canvas from "../../components/Canvas/Canvas";
import { Snake } from "./snake";
import { Point, Rectangle, getRandomInt, rectanglesIntersecting, rectanglesIntersecting2nd } from "../../Utils/Util";

export const SnakeComponent = (props:any) => {
    // needing to create a snake as a ref. 
    // Needing to assign a onkeydown event to the window so we can capture key press. 
    // so we can control the snake and or restart the game.
    let snakeRef = useRef(new Snake(50, 50));
    let foodRef = useRef(new Rectangle(new Point(20, 50), snakeRef.current.snakeSquareResolution));

    let handKeyDown = (e:KeyboardEvent) => {
        let valuePressed = e.key.toString().toLowerCase();
        if (valuePressed === "arrowright") { snakeRef.current.GoRight(); } 
        else if (valuePressed === "arrowleft") { snakeRef.current.GoLeft(); }
        else if (valuePressed === "p") { canvasProps.pausegame(); }
        else if (valuePressed === "s") { canvasProps.startgame(); }
        else if (valuePressed === "r") {
            canvasProps.pausegame();
            snakeRef.current = new Snake(50, 50);
            foodRef.current = new Rectangle(new Point(20, 50), snakeRef.current.snakeSquareResolution);
        }
        // else if (valuePressed === "arrowup") { snakeRef.current.GoUp(); } 
        // else if (valuePressed === "arrowdown") { snakeRef.current.GoDown(); }
    } 

    /*
        Going to need to calculate the intersection of two squares. -> done
        Also I'm going to need to calculate the intersection of the head with it's body. -> done
        Going to need to add eat ability -> done
    */

    useEffect(() => {
        window.addEventListener("keydown", handKeyDown);

        return () => {
            window.removeEventListener("keydown", handKeyDown);
        }
    })

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {
        // draw snake
        snakeRef.current.draw(ctx);
        foodRef.current.drawSolid(ctx);
    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {
        // does this intersect with new square
        let head = snakeRef.current.getHeadOfSnake();
        //console.log(food);
        let eaten = false;
        if (rectanglesIntersecting(head, foodRef.current)) {
           // alert("I ate food");
           // console.log("I ate the food. ");
           eaten = true;
           foodRef.current = (new Rectangle(new Point(getRandomInt(100), getRandomInt(100)), snakeRef.current.snakeSquareResolution))
        }

        snakeRef.current.body = snakeRef.current.snakeCalculation(eaten);
        eaten = false;
        
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