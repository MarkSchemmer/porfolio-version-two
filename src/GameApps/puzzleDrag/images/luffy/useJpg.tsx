import React from "react";

import luffyRow1Column1 from "../luffy/Luffy-Img/row-1-column-1.jpg";
import luffyRow1Column2 from "../luffy/Luffy-Img/row-1-column-2.jpg";
import luffyRow1Column3 from "../luffy/Luffy-Img/row-1-column-3.jpg";

import luffyRow2Column1 from "../luffy/Luffy-Img/row-2-column-1.jpg";
import luffyRow2Column2 from "../luffy/Luffy-Img/row-2-column-2.jpg";
import luffyRow2Column3 from "../luffy/Luffy-Img/row-2-column-3.jpg";

import luffyRow3Column1 from "../luffy/Luffy-Img/row-3-column-1.jpg";
import luffyRow3Column2 from "../luffy/Luffy-Img/row-3-column-2.jpg";
import luffyRow3Column3 from "../luffy/Luffy-Img/row-3-column-3.jpg";
import { Point } from "../../../../Utils/Util";

export class PuzzleImage {
    public imagePath: string;
    public winningCoord: Point;
    constructor(path:string, winningCoordinate:Point) {
        this.imagePath = path;
        this.winningCoord = winningCoordinate;
    }
}


export const useJpg = () => {

    const luffy = [
        [ luffyRow1Column1, luffyRow1Column2, luffyRow1Column3 ],
        [ luffyRow2Column1, luffyRow2Column2, luffyRow2Column3 ],
        [ luffyRow3Column1, luffyRow3Column2, luffyRow3Column3 ]
    ].map((row, x) => {
        return (
            row.map((col, y) => new PuzzleImage(col, new Point(y, x)))
        )
    });

    return {
        luffy
    }
}

