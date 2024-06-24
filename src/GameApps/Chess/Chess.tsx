
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
*/

import { TestingDashboard } from "./TestingDashboard/TestingDashBoard"
import { ChessBoard } from "./board/ChessBoard"

export const ChessApp = () => {
    return (
        <>
           <TestingDashboard />
           <ChessBoard />
        </>
    )
}