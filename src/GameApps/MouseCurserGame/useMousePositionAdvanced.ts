import React, { useEffect, useState } from "react";
import { Point } from "../../Utils/Util";


enum Directions {
    LEFT = "LEFT", RIGHT = "RIGHT", UP = "UP", DOWN = "DOWN"
}

export interface IAdvancedMouseDirections {
    xDirection: XAxisMovement;
    yDirection: YAxisMovement;
    prevPoint: Point | null;
    currentPoint: Point | null;
    distance: number | null;
    currentX: number | null;
    prevX: number | null;
    currentY: number | null;
    prevY: number | null;
    prevXDelta: number | null;
    prevYDelta: number | null;
}

type XAxisMovement = Directions.LEFT | Directions.RIGHT | null;

type YAxisMovement = Directions.UP | Directions.DOWN | null;

export const initialData : IAdvancedMouseDirections = {
    xDirection: null,
    yDirection: null,
    prevPoint: null,
    currentPoint: null,
    distance: null,
    currentX: null,
    prevX: null,
    currentY: null,
    prevY: null,
    prevXDelta: null,
    prevYDelta: null
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
                    let currentY = nextPoint.y;

                    let prevX = prevPoint ? prevPoint.x : null;
                    let prevY = prevPoint ? prevPoint.y : null;

                    let prevXDelta = currentX - (prevX ? prevX : 0);
                    let prevYDelta = currentY - (prevY ? prevY : 0);

                    let xAxisDirection: XAxisMovement = whichDirectionXAxis(prev.xDirection, prevXDelta);
                    let yAxisDirection: YAxisMovement = whichDirectionYAxis(prev.yDirection, prevYDelta);

                    return {
                        ...prev,
                        distance,
                        prevPoint,
                        currentPoint: nextPoint,
                        xDirection: xAxisDirection,
                        yDirection: yAxisDirection,
                        currentX,
                        prevX,
                        prevXDelta,
                        prevYDelta
                    };
                }
            );
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

export const whichDirectionXAxis = (prevDirction: XAxisMovement, delta: number): XAxisMovement => {
    return delta < 0 ? Directions.LEFT : delta > 0 ? Directions.RIGHT : prevDirction;
};

export const whichDirectionYAxis = (prevDirction: YAxisMovement, delta: number): YAxisMovement => {
    return delta < 0 ? Directions.UP : delta > 0 ? Directions.DOWN : prevDirction;
};