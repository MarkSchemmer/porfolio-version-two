import { Box } from "@chakra-ui/react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getBoard, getMoveHistory, UpdateChessBoard, updateSelectedPiece } from "../../../store/slices/chessSlice";
import { Board } from "../board/Board";
import { Square } from "../board/Square";
import { MoveState } from "../ChessMoveBuffer/Move";
// import "../ChessDashboard/ChessDashboard.scss";

export function ChessDashboard() {
  const dispatch = useDispatch();
  const boardobj = useSelector(getBoard) as Board;

  // if we select square and it has a piece we populate with this square.
  const selectedPiece = useSelector(getMoveHistory).cur as Square | null;

  const updateBoardAndSelectedPiece = (board: Board, piece: Square | null) => {
    dispatch(UpdateChessBoard(board));
    dispatch(updateSelectedPiece(piece));
  };

  return (
    <>
      <Box className="chess-dashboard" style={{
        height: '500px',
        width: '500px',
        border: '5px solid black', 
        display: 'inline-block',
        float: 'right',
        marginTop: '100px',
        marginRight: '100px',
        borderRadius: '10px'
      }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{
            height: '100px',
            marginRight: '50px',
            padding: '25px',
            border: '1px solid black'
        }}
        onClick={() => {
            console.log("undoing now.")
            const lastUndo = boardobj.moveBuffer.undo();
            if (boardobj.logic.isValue(lastUndo)) {
                boardobj.undoMove(lastUndo as MoveState);
                updateBoardAndSelectedPiece(boardobj, null);
            }
        }}
        />
        <FontAwesomeIcon icon={faArrowRight} style={{
            height: '100px', marginLeft: '50px',
            padding: '25px', border: '1px solid black'
        }}
        onClick={() => {
            console.log("redoing move");
            const lastRedo = boardobj.moveBuffer.redo();
            if (boardobj.logic.isValue(lastRedo)) {
                boardobj.makeMove(lastRedo as MoveState);
                updateBoardAndSelectedPiece(boardobj, null);
            }
        }}
        />
      </Box>
    </>
  );
}
