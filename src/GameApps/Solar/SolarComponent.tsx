import React, { useEffect, useRef, useState } from "react"
import { IOptions, boardConfigurationsDefault } from "../../components/Canvas/CanvasProps";
import { useCanvasProps } from "../../components/Canvas/useCanvasProps";
import Canvas from "../../components/Canvas/Canvas";
import { Planet } from "./Solar";
import { Point } from "../../Utils/Util";

export const SolarComponent = (props:any) => {
    let sunRef = useRef(new Planet(new Point(250, 250), 10, Math.PI * 10 / 1000000, null, 0, "yellow", 100));

    let earthRef = useRef(new Planet(new Point(150+250, 250), 5, Math.PI * 10 / 1000000, null, 0, "green", 100));
    earthRef.current.setSunPoint(sunRef.current.point);

    earthRef.current.setDelta(Math.PI * 10 / 99_999_9);

    let earthMoonRef = useRef(new Planet(new Point(150+250, 250), 5, Math.PI * 10 / 1000000, null, 0, "grey", 20));
    earthMoonRef.current.setSunPoint(earthRef.current.point);

    earthMoonRef.current.setDelta(2000)

    let marsRef = useRef(new Planet(new Point((150+250), 250), 5, Math.PI * 10 / 1000000, null, 0, "orange", 155));
    marsRef.current.setSunPoint(sunRef.current.point);

    let lastTimeStampRef = useRef<number | null>(null);
    let speedRef = useRef(Math.PI * 10 / 1000000);
    let timeStepRef = useRef(100);

    let restartGame = () => {

    };

    let handKeyDown = (e:KeyboardEvent) => {

    };

    useEffect(() => {

    }, [sunRef, earthRef, earthMoonRef, marsRef]);

    let draw = (ctx:any, canvas:any, options: IOptions, now:number) => {
        sunRef.current.drawSolid(ctx);
        earthRef.current.drawSolid(ctx);
        earthRef.current.drawRadiusFromSunToCenterOfPlanet(ctx);

        earthMoonRef.current.drawSolid(ctx);
        earthMoonRef.current.drawRadiusFromSunToCenterOfPlanet(ctx);

        marsRef.current.drawSolid(ctx);
        marsRef.current.drawRadiusFromSunToCenterOfPlanet(ctx);
    };

    let calculations = (ctx:any, canvas:any, options: IOptions, now:number) => {
        let sun = sunRef.current;
        /*
            When figuring out how to rotate a circle around another. 

            You take that other circle's x and y and then add that to the cos and sin with multiplying it from the distance from
            the two. 

            So when determing rotation, I should include a function for keeping track
        
        */
       earthRef.current.rotatePlanetAroundOhterCircle(sun.point);
       earthMoonRef.current.rotatePlanetAroundOhterCircle(earthRef.current.point);
       marsRef.current.rotatePlanetAroundOhterCircle(sun.point);

       
    };

    let handleClick = (e:any, canvas:any, options:IOptions) => {

    };

    let canvasProps = useCanvasProps(draw, calculations, boardConfigurationsDefault, handleClick);
    // can make the game go faster when needed. 
    canvasProps.options.fpsInterval.current = 10; // assign this value to state and add a dashboard to update and edit the game
    canvasProps.options.runner.current = true;

    return (
        <div className="snake-container">
            <Canvas {...canvasProps} /> 
        </div>
    );
};