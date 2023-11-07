import { Square } from "../entities/Square";
import { TicTacToeEnum } from "../slices/TicTacToeSlice";

const Xwinner = (arr: Square[]) => arr.every(s => s.value === TicTacToeEnum.X);
const Ywinner = (arr: Square[]) => arr.every(s => s.value === TicTacToeEnum.O);

const setHasValue = (arr: Square[]) => arr.every(s => s.value !== null && s.value !== undefined);

const getTicTacToeSets = (board: Square[][]) => {

}

export const TicTacToeResult = (board: Square[][]) => {
    let arr1 = board[0], arr2 = board[1], arr3 = board[2];
    let a1 = arr1[0], a2 = arr1[1], a3 = arr1[2];
    let b1 = arr2[0], b2 = arr2[1], b3 = arr2[2];
    let c1 = arr3[0], c2 = arr3[1], c3 = arr3[2];
    let arr4 = [a1, b1, c1], arr5 = [a2, b2, c2], arr6 = [a3, b3, c3], arr7 = [a1, b2, c3];

    let sets = [
        arr1, arr2, arr3, arr4, arr5, arr6, arr7
    ];

    let hasWinner = sets.filter(Xwinner);
    let hasOWinner = sets.filter(Ywinner);

    if (hasWinner.length > 0) {
        return hasWinner[0][0].value;
    }

    if (hasOWinner.length > 0) {
        return hasOWinner[0][0].value;
    }

    if (sets.every(setHasValue)) {
        return "tie"
    }

    return null;
};

export const TicTacToeWinnerSet = (board: Square[][]) => {
    let arr1 = board[0], arr2 = board[1], arr3 = board[2];
    let a1 = arr1[0], a2 = arr1[1], a3 = arr1[2];
    let b1 = arr2[0], b2 = arr2[1], b3 = arr2[2];
    let c1 = arr3[0], c2 = arr3[1], c3 = arr3[2];
    let arr4 = [a1, b1, c1], arr5 = [a2, b2, c2], arr6 = [a3, b3, c3], arr7 = [a1, b2, c3];

    let sets = [
        arr1, arr2, arr3, arr4, arr5, arr6, arr7
    ];

    let hasWinner = sets.filter(Xwinner);
    let hasOWinner = sets.filter(Ywinner);

    if (hasWinner.length > 0) {
        return hasWinner[0];
    }

    if (hasOWinner.length > 0) {
        return hasOWinner[0];
    }

    return null;
};