import React from "react";
import "../styles/main.css";
import { useSelector } from "react-redux";
import { sliceBoard } from "../slices/TicTacToeSlice";
import { SquareComponent } from "./SquareComponent";

export const TicTacToe = () => {
    let b = useSelector(sliceBoard);
    return (
        <div className="tic-container">
            {
            b.map((row, idx) => 
                {
                    return (<div className="row" key={idx}>{row.map(r => <SquareComponent key={r.id} square={r} />)}</div>)
                })
            }
        </div>
    );
}