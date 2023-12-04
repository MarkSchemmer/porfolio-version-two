import React, { useEffect, useState } from "react";
import { Point } from "../../Utils/Util";

export const useMousePosition = () => {
    let [mousePosition, setPosition] = useState(new Point(0, 0));
    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            setPosition(new Point(e.pageX, e.pageY));
        }

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        }

    }, [mousePosition]);
    return mousePosition;
};