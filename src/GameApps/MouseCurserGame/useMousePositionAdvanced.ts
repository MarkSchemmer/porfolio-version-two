import React, { useEffect, useState } from "react";
import { Point } from "../../Utils/Util";


enum Directions {
    LEFT = "LEFT", RIGHT = "RIGHT", UP = "UP", DOWN = "DOWN"
}

export interface IAdvancedMouseDirections {
    xDirection: XAxisMovement;
    yDirection: Directions.UP | Directions.DOWN | null;
    prevPoint: Point | null;
    currentPoint: Point | null;
    distance: number | null;
    currentX: number | null;
    prevX: number | null;
}

type XAxisMovement = Directions.LEFT | Directions.RIGHT | null;

export const initialData : IAdvancedMouseDirections = {
    xDirection: null,
    yDirection: null,
    prevPoint: null,
    currentPoint: null,
    distance: null,
    currentX: null,
    prevX: null
}

export const useMousePositionAdvanced = () => {
    let [mousePosition, setPosition] = useState(initialData);
    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            let nextPoint = new Point(e.pageX, e.pageY);
            setPosition(
                (prev: IAdvancedMouseDirections) => {
                    let prevPoint = prev.currentPoint;
                    let distance = prevPoint ? distanceFormula(prevPoint, nextPoint) : 0;
                    let currentX = nextPoint.x;
                    let prevX = prevPoint ? prevPoint.x : null;
                    console.log(
                        "prev X -> " + prevX,
                        "Next X -> " + currentX
                    );
                    let prevXDelta = currentX - (prevX ? prevX : 0);
                    console.log("delta: " + prevXDelta);
                    // If delta is less than 0 left 
                    let xAxisDirection: XAxisMovement = whichDirectionXAxis(prev.xDirection, prevXDelta);
                    console.log(xAxisDirection);
                    return {
                        ...prev,
                        distance,
                        prevPoint,
                        currentPoint: nextPoint,
                        xDirection: xAxisDirection,
                        currentX,
                        prevX
                    }
                }
            )

        }

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        }

    }, [mousePosition]);
    return mousePosition;
};

export const distanceFormula = (p1: Point, p2: Point) => {
    return Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
}

export const whichDirectionXAxis = (prevDirction: XAxisMovement | null, delta: number): XAxisMovement => {
    return delta < 0 ? Directions.LEFT : delta > 0 ? Directions.RIGHT : prevDirction;
};