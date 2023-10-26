import React from "react";
import "../styles/main.css";

/*
    null -> empty square
    0 -> X
    1 -> O
*/

class Square {

    // width and height
    public Dimension = "100px";
    public boderColor = "black";
    public value: any;

    constructor(val:any) {
        this.value = val;
    }

    render() {
        return (
            <div className="square"></div>
        )
    }
}

enum TicTacToeEnum {
    X = "X",
    O = "O"
};

const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let genBoard = () => board.map(row => {
    return row.map(columnItem => new Square(columnItem))
});

export const TicTacToe = () => {

    let b = genBoard();

    return (
        <div className="tic-container">
            {
            b.map(row => 
                {
                    return (<div className="row">{row.map(r => r.render())}</div>)
                })
            }
        </div>
    );
}