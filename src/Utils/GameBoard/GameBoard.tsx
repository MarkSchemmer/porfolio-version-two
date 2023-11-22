import React from 'react';
import '../GameBoard/styles/main.css';
import Board from "../GameBoard/GameBoard";

type IBoardProps = {
    board: Board;
}

export const GameBoard = (props: IBoardProps) => {
    return (
        <div id={props.board.Id}></div>
    );
}