import { useRef, useState } from "react";
import "../puzzleDrag/styles/main.css";
import { ArePointsEqual, Point, e2 } from "../../Utils/Util";
import { initialState } from "../../hooks/useDrag";
import { PuzzlePiece } from "./PuzzlePiece";
import { useJpg } from "./images/luffy/useJpg";

// To add to this game going to need to 
// - Add other child divs and can't allow overlap
// - Find smart technologie for drop in a array grid system
// - Calculate the position of the square in the array 
// - Add hightlights for the grid sqaure that the divRef is hovering over
// - Probably going to need to keep track of what div was selected... Going to need to create a complex object to track all this data. 
// - Then a complex way 

//console.log(state.pos.x + pieceResolution.width);
//console.log(res.width);
// just add 152 to x to see if great than boardRef width. -> state.pos.x + 152(pieceRef.width) >= res.width
// if You want determine the left side just take "pos.x >= 0"
// These two conditions for x will keep it in the width of the board. 
// Need to create this same equation for Y-axis. 

export const baseSquare = [
    [ "blue", "green", "pink" ],
    [ "orange", "purple", "red" ],
    [ "grey", "#AAF5EC", "#F5AADB" ]
];

function shuffle<T>(array:T[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export const PuzzleDrag = (props:any) => {

    let boardRef = useRef<HTMLDivElement>(null);
    let luffy = useJpg().luffy;
    // console.log(luffy);
    let [sq, setSquares] = useState(luffy);

    let p1 = useRef(false);
    let p2 = useRef(false);
    let p3 = useRef(false);
    let p4 = useRef(false);
    let p5 = useRef(false);
    let p6 = useRef(false);
    let p7 = useRef(false);
    let p8 = useRef(false);
    let p9 = useRef(false);

    let setOfRefs = [
        p1,p2,p3,p4,p5,p6,p7,p8,p9 
    ];

    let squares = sq.map((row, x) => {
        return (row.map((c, y) => ({ boardRef, ID: e2(), 
              styleProps: { backgroundImage: `url(${sq[x][y].imagePath})`}, 
              initialProps: {
                                ...initialState, 
                                pos: new Point(152 * x, 152 * y), 
                                lastSavedPos: new Point(152 * x, 152 * y),
                                coordinates: {
                                    prevCoordinate: null,
                                    coordinate: new Point(x, y),
                                    prevPoint: null,
                                    currentPoint: new Point(152 * x, 152 * y)
                                }
                            },
                validPieceGridLocation: sq[x][y].winningCoord,
                isWinner: ArePointsEqual(new Point(152 * x, 152 * y), sq[x][y].winningCoord)
            })));
    })
    .reduce(
        (acc, cur, idx) => { return [ ...acc, ...cur ]; }, []
    );

    squares.forEach((i, idx) => {
        setOfRefs[idx].current = i.isWinner;
    });

    return (
        <div className="board" 
        style={{
            position: "absolute",
            left: "40%"
        }} ref={boardRef}>
            {squares.map((i, idx) => {
                return (<PuzzlePiece 
                key={i.ID} 
                ID={i.ID} 
                isWinner={setOfRefs[idx]}
                validPieceGridLocation={i.validPieceGridLocation}
                boardRef={boardRef} 
                styleProps={i.styleProps} 
                initialProps={i.initialProps} />);
            })}
        </div>
    )
};


export const handleClickForGridCoordinates = (e:any, parent: any) => {
    if (parent) {
        const rect = parent.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the grid square based on mouse coordinates
        const col = Math.floor(mouseX / 152);
        const row = Math.floor(mouseY / 152);
        return [col, row];
    }

      return [];
}
