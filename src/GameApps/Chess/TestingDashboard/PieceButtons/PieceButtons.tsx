import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";

import blackPond from "../../utils/GameImages/bp.png";
import whitePond from "../../utils/GameImages/wp.png";

import blackRook from "../../utils/GameImages/br.png";
import whiteRook from "../../utils/GameImages/wr.png";

import blackKnight from "../../utils/GameImages/bn.png";
import whiteKnight from "../../utils/GameImages/wn.png";

import blackBishop from "../../utils/GameImages/bb.png";
import whiteBishop from "../../utils/GameImages/wb.png";

import blackQueen from "../../utils/GameImages/bq.png";
import whiteQueen from "../../utils/GameImages/wq.png";

import blackKing from "../../utils/GameImages/bk.png";
import whiteKing from "../../utils/GameImages/wk.png";

import "./BoxPiece.scss";
import { useDispatch, useSelector } from "react-redux";
import { PieceColor, PieceNames } from "../../utils/Utils";
import {
  getCurrentPieceBeingManipulated,
  updatePieceManipulationTesting,
} from "../../../../store/slices/chessSlice";
/*

    - After testing is complete adding chess coordinates and history of move detection

*/

/*
    Notes on board manipulation section: 

    1. on-off button - when on resets board, switched; off resets entire board
    
    2. when on, select one piece then click square on board and render that piece
       continue slecting different pieces and playing them on the board 

    3. when finished hit the start button and pieces can move on the board and all rules apply
       we use this testing phase to understand how castling works 

*/

/*
        Last part of tests are game scenarios - list out scenarios as they come up.

        1. Check detection
        2. Castle 
        3. en-passant
        4. Check mate scenarios 
        5. Tie scenarios 

*/
const blackPieces = [
  { name: PieceNames.POND, image: blackPond, pieceColor: PieceColor.BLACK },
  { name: PieceNames.KNIGHT, image: blackKnight, pieceColor: PieceColor.BLACK },
  { name: PieceNames.BISHOP, image: blackBishop, pieceColor: PieceColor.BLACK },
  { name: PieceNames.ROOK, image: blackRook, pieceColor: PieceColor.BLACK },
  { name: PieceNames.QUEEN, image: blackQueen, pieceColor: PieceColor.BLACK },
  { name: PieceNames.KING, image: blackKing, pieceColor: PieceColor.BLACK },
];

const whitePieces = [
  { name: PieceNames.POND, image: whitePond, pieceColor: PieceColor.WHITE },
  { name: PieceNames.KNIGHT, image: whiteKnight, pieceColor: PieceColor.WHITE },
  { name: PieceNames.BISHOP, image: whiteBishop, pieceColor: PieceColor.WHITE },
  { name: PieceNames.ROOK, image: whiteRook, pieceColor: PieceColor.WHITE },
  { name: PieceNames.QUEEN, image: whiteQueen, pieceColor: PieceColor.WHITE },
  { name: PieceNames.KING, image: whiteKing, pieceColor: PieceColor.WHITE },
];

export const BoxPiece = (props: any) => {
  const dispatch = useDispatch();
  const currentPiecebeingManipulated = useSelector(
    getCurrentPieceBeingManipulated
  );
  const { name, image, pieceColor } = props.pieceObj;
  const isPieceSelected =
    currentPiecebeingManipulated?.pieceSelected?.name === name &&
    currentPiecebeingManipulated?.pieceSelected?.pieceColor === pieceColor;
    
  return (
    <Box
      onClick={() => {
        dispatch(updatePieceManipulationTesting({ name, pieceColor }));
      }}
      className="piece"
      style={{
        borderColor: isPieceSelected ? "gold" : "black",
        opacity: isPieceSelected ? 0.5 : 1,
      }}
      border={"1px solid black"}
      borderRadius={"5px"}
      p={1}
      textAlign={"center"}
      backgroundColor={"#0cafff"}
    >
      <Text color={"yellow"}>{name}</Text>
      <Box>
        <img style={{ height: "55px" }} src={image} />
      </Box>
    </Box>
  );
};

export const BoxPieces = (props: any) => {
  return (
    <Flex
      className="box-container"
      direction={"row"}
      alignItems={"center"}
      width={"100%"}
      placeItems={"center"}
      marginBottom={"50px"}
    >
      <Box
        style={{
          display: "block",
        }}
      >
        {blackPieces.map((p) => (
          <BoxPiece key={p.name + p.pieceColor} pieceObj={p} />
        ))}
      </Box>
      <Box>
        {whitePieces.map((p) => (
          <BoxPiece key={p.name + p.pieceColor} pieceObj={p} />
        ))}
      </Box>
    </Flex>
  );
};
