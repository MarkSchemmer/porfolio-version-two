import React from "react";
import { ChessDashboard } from "../ChessDashboard/ChessDashboard";
import { Box, Flex } from "@chakra-ui/react";

export const BoardV2 = () => {
  const rows = 8;
  const cols = 8;

  const createBoard = () => {
    const squares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isDark = (row + col) % 2 === 1;
        squares.push(
          <div
            key={`${row}-${col}`}
            style={{
              backgroundColor: isDark ? "#769656" : "#eeeed2",
              width: "100%",
              height: "100%",
            }}
          />
        );
      }
    }
    return squares;
  };

  return (
    <>
      <Box
      display={'flex'}
      flexDirection={'row'}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            width: "80%",
            height: "80%",
            maxWidth: "min(80vmin, 80vh)",
            aspectRatio: "1",
            border: "4px solid black",
            marginRight: '25px'
          }}
        >
          {createBoard()}
        </div>
        <ChessDashboard />
      </Box>
    </>
  );
};
