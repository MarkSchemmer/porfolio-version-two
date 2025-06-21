/*

    Some development rules, all methods should pure, and in their stand alone file. 

    All classes need to be in their own file as well. 

    In the game of chess we have a board with squares. 
    And pieces, the pieces all have rules applied to them
    And the game functions in a turn base sequence. 

    We have White pieces and Black pieces

    List of piece names: 

    - Pond
    - Knight
    - Bishop
    - Rook
    - Queen
    - King

    Special game concerns 

    - En-Pessant
    - Castling
    - Check
    - CheckMate
    - Each pieces unique movement

    The app can be developed in html-css or in a canvas type scenario. 

    Both solutions function...



    Steps for the game. 

    1. Create a board that responds and has propper coordinates
    2. Render pieces and add rules to movement for pieces
    3. Add logic and detection
    4. make the board resizable and moveable. 
    4. investigate ai for chess?
    5. investigate payment using bitcoin for betting on app?


    ---------------------------------------------------------

    ---------------------------------------------------------




    Board is testing for connectivity. -> DONE

    Add another part to the interactive testing dashboard, for changing coordinate
    design and being able to render chess pieces... 

    Basically I should be able to select a piece and render it on the board
    And then in the future we can demonstrate check, check mate, en-pessant and 
    other intrusting scenarios 

    Then as we progress maybe we can even setup a chess puzzle type ability to solve the
    puzzle and then we can get a green and or red result... 

    As the game app progresses this can be a foundation for 
    incorporating let's bitcoin and we can have a ai detect ai 
    then while players are playing ai can determine if a player 
    is cheating or not then if it is we can pause the game, and ban the player for a 
    6 month period. 
*/
import { BoardV2 } from "./BoardV2/BoardV2";
// import { ChessDashboard } from "./ChessDashboard/ChessDashboard";
// import { TestingDashboard } from "./TestingDashboard/TestingDashBoard";
// import { ChessBoard } from "./board/ChessBoard";

// import { TouchBackend } from 'react-dnd-touch-backend'
// import { DndProvider } from 'react-dnd'


export const ChessApp = () => {
  return (
    <>
      {/* <TestingDashboard /> */}
      {/* <ChessDashboard /> */}
      {/* <ChessBoard /> */}
      <BoardV2 />
    </>
  );
};
