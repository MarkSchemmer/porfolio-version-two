import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleTicTacToeClick, HasWinner, HighlightWinningSquares, SwitchTurn, TicTacToeEnum, sliceWinner } from "../slices/TicTacToeSlice";
import { Square } from "./Square";

export const SquareComponent = (props: {square: Square}) => {
    const dispatch = useDispatch();
    const winner = useSelector(sliceWinner);
    return (
        <div className={"square" + (props.square.winningSquare ? " winner " : " ")} onClick={() => {
            if (props.square.value === null && winner === null) 
            {
                dispatch(HasWinner(null));
                dispatch(HandleTicTacToeClick({sqaure: props.square}));
                dispatch(SwitchTurn(null));
                dispatch(HasWinner(null));
                dispatch(HighlightWinningSquares(null));
            }
        }}>
            <span className={"sq-txt"}>
                {props.square.value != null ? props.square.value : ""}
            </span>
        </div>
    )
}