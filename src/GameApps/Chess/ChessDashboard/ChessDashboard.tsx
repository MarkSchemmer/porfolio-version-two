import { Box, Flex } from "@chakra-ui/react";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoard,
  getMoveHistory,
  UpdateChessBoard,
  updateSelectedPiece,
} from "../../../store/slices/chessSlice";
import { Board } from "../board/Board";
import { Square } from "../board/Square";
import { MoveState } from "../ChessMoveBuffer/Move";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { generateStandardBoard, PieceColor } from "../utils/Utils";
// import "../ChessDashboard/ChessDashboard.scss";

export function ChessDashboard() {
  const dispatch = useDispatch();
  const boardobj = useSelector(getBoard) as Board;

  const playerToMove =
    boardobj.turn % 2 === 0 ? PieceColor.WHITE : PieceColor.BLACK;

  // if we select square and it has a piece we populate with this square.
  const selectedPiece = useSelector(getMoveHistory).cur as Square | null;

  const updateBoardAndSelectedPiece = (board: Board, piece: Square | null) => {
    dispatch(UpdateChessBoard(board));
    dispatch(updateSelectedPiece(piece));
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        className="chess-dashboard"
        style={{
          border: "5px solid black",
          width: "45%",
          maxWidth: "500px",
          borderRadius: "5px",
        }}
      >
        <Box
          style={{
            fontWeight: "bolder",
            padding: "10px",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          {playerToMove} to Move
        </Box>

        <Box
          style={{
            border: "1px solid black",
            flex: "1 1 auto",
            width: "90%",
            margin: "auto",
            marginBottom: "10px",
            overflowY: "auto",
            maxHeight: "calc(min(80vmin, 80vh) - 135px)", // matches board max height minus padding
          }}
          className="chess-notation"
        >
          {boardobj.moveBuffer.Moves.map((move: MoveState) => {
            return <Box>{move.currentTurn}: </Box>;
          })}
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"auto"}
          className="control-panel"
          style={{}}
        >
          {/* New game */}
          <FontAwesomeIcon
            onClick={() => {
              dispatch(UpdateChessBoard(generateStandardBoard()));
            }}
            style={{
              height: "50px",
              width: "25%",
              border: "3px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "1px",
            }}
            icon={faPlus as IconProp}
          />

          {/* Stop game or resign game */}
          <FontAwesomeIcon
            style={{
              height: "50px",
              width: "25%",
              border: "3px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "1px",
            }}
            icon={faStop as IconProp}
          />

          <FontAwesomeIcon
            icon={faArrowLeft as IconProp}
            style={{
              height: "50px",
              width: "25%",
              border: "3px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "1px",
            }}
            onClick={() => {
              console.log("undoing now.");
              const lastUndo = boardobj.moveBuffer.undo();
              if (boardobj.logic.isValue(lastUndo)) {
                boardobj.undoMove(lastUndo as MoveState);
                updateBoardAndSelectedPiece(boardobj, null);
              }
            }}
          />
          <FontAwesomeIcon
            icon={faArrowRight as IconProp}
            style={{
              height: "50px",
              width: "25%",
              border: "3px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "1px",
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
      </Box>
    </>
  );
}
