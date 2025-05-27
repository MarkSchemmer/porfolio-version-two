import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";

import blackRook from "../../../utils/GameImages/br.png";
import whiteRook from "../../../utils/GameImages/wr.png";

import blackKnight from "../../../utils/GameImages/bn.png";
import whiteKnight from "../../../utils/GameImages/wn.png";

import blackBishop from "../../../utils/GameImages/bb.png";
import whiteBishop from "../../../utils/GameImages/wb.png";

import blackQueen from "../../../utils/GameImages/bq.png";
import whiteQueen from "../../../utils/GameImages/wq.png";

import { PieceColor, PieceNames } from "../../../utils/Utils";
import {
  getBoard,
  getPondPromotion,
  UpdateChessBoard,
  updatePondPromotion,
} from "../../../../../store/slices/chessSlice";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "../../Board";
import { MathCoordinate } from "../../Square";

const blackPieces = [
  { name: PieceNames.KNIGHT, image: blackKnight, pieceColor: PieceColor.BLACK },
  { name: PieceNames.BISHOP, image: blackBishop, pieceColor: PieceColor.BLACK },
  { name: PieceNames.ROOK, image: blackRook, pieceColor: PieceColor.BLACK },
  { name: PieceNames.QUEEN, image: blackQueen, pieceColor: PieceColor.BLACK },
];

const whitePieces = [
  { name: PieceNames.KNIGHT, image: whiteKnight, pieceColor: PieceColor.WHITE },
  { name: PieceNames.BISHOP, image: whiteBishop, pieceColor: PieceColor.WHITE },
  { name: PieceNames.ROOK, image: whiteRook, pieceColor: PieceColor.WHITE },
  { name: PieceNames.QUEEN, image: whiteQueen, pieceColor: PieceColor.WHITE },
];

const BoxPiece = (props: any) => {
  const { name, image, pieceColor } = props;
  const dispatch = useDispatch();
  const boardobj = useSelector(getBoard) as Board;
  const pondPromotionData = useSelector(getPondPromotion);

  return (
    <Box
      onClick={() => {
        boardobj.promotePond(
          pondPromotionData.coordinateToPromote as MathCoordinate,
          name,
          pieceColor
        );

        dispatch(UpdateChessBoard(boardobj));
        dispatch(
          updatePondPromotion({
            IsOpen: false,
            pieceName: null,
            pieceColor: null,
            coordinateToPromote: null,
          })
        );

        // we need to check for Check & CheckMate.
        const playerBeingPromotedColor = pieceColor;
        // const otherPlayerColor =
        //   playerBeingPromotedColor === PieceColor.WHITE
        //     ? PieceColor.BLACK
        //     : PieceColor.WHITE;


          // if white is moving then check is black in check
          // if black is moving then check is white in check

          const isCheck =
          playerBeingPromotedColor === PieceColor.WHITE
              ? boardobj.logic.IsBlackInCheck(boardobj)
              : boardobj.logic.IsWhiteInCheck(boardobj); 

        if (isCheck) {
          console.log(
            playerBeingPromotedColor +
              " Is checking " +
              (playerBeingPromotedColor === PieceColor.WHITE
                ? PieceColor.BLACK
                : PieceColor.WHITE)
          );

          const checkCheckMate =
          playerBeingPromotedColor === PieceColor.WHITE
            ? boardobj.logic.WhiteCheckMatingBlack(boardobj)
            : boardobj.logic.BlackCheckMatingWhite(boardobj);

          if (checkCheckMate) {
            console.log(
              playerBeingPromotedColor +
                " CheckMated " +
                (playerBeingPromotedColor === PieceColor.WHITE
                  ? PieceColor.BLACK
                  : PieceColor.WHITE)
            );
          }
        }
      }}
      className="piece"
      style={{
        borderColor: "black",
        opacity: 1,
      }}
      border={"1px solid black"}
      borderRadius={"5px"}
      marginRight={"10px"}
      p={1}
      textAlign={"center"}
      backgroundColor={"#0cafff"}
    >
      <Text color={"yellow"}>{name}</Text>
      <Box>
        <img style={{ height: "55px" }} src={image} alt={pieceColor + name} />
      </Box>
    </Box>
  );
};

export const PondPromotion = (props: any) => {
  const { IsOpen } = props;
  const cancelRef = React.useRef(null);
  const pondPromotionData = useSelector(getPondPromotion);

  return (
    <>
      <AlertDialog
        isOpen={IsOpen}
        onClose={() => {}}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              textAlign={"center"}
            >
              Select Promotion
            </AlertDialogHeader>

            <AlertDialogBody marginLeft={"12%"}>
              {(pondPromotionData.pieceColor === PieceColor.WHITE
                ? whitePieces
                : blackPieces
              ).map((p) => (
                <BoxPiece key={p.name} {...p} />
              ))}
            </AlertDialogBody>

            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
