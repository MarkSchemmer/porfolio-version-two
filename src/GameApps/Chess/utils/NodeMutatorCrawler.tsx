import { Square } from "../board/Square";
import { PieceLogicService } from "../PieceLogicService/PieceLogicService";

export enum DirectionCrawl {
    left = "left",
    right = "right",
    forward = "forward",
    back = "back",
    diagonalLeft = "diagonalLeft",
    diagonalRight = "diagonalRight",
    diagonalBackLeft = "diagonalBackLeft",
    diagonalBackRight = "diagonalBackRight"
}

export const NodeMutatorFactory = (node: Square, direction: DirectionCrawl) => {
    switch(direction) {
        case DirectionCrawl.left: {
            return node?.left;
        }
        case DirectionCrawl.right : {
            return node?.right;
        }
        case DirectionCrawl.forward : {
            return node?.forward;
        } 
        case DirectionCrawl.back : {
            return node?.back;
        }
        case DirectionCrawl.diagonalLeft : {
            return node?.diagonalLeft;
        }
        case DirectionCrawl.diagonalRight : {
            return node?.diagonalRight;
        }
        case DirectionCrawl.diagonalBackLeft : {
            return node?.diagonalBackLeft;
        }
        case DirectionCrawl.diagonalBackRight : {
            return node?.diagonalBackRight;
        }
        default : {
            // log and track just in case. 
        }
    }

    return null;
};

export const NodeCrawler = (
  node: Square | undefined,
  squares: Square[],
  logic: PieceLogicService,
  crawlDirection: DirectionCrawl
): any => {
  
  const originalNode = node;
  
  let step = NodeMutatorFactory(node as Square, crawlDirection);

  while (step) {
    
    if (node === undefined || node === null) 
    {
        return squares;
    }
      // test if forward square has a piece 
      // if it does and it's the same color 
      // break the function and return what we have
      const hasPiece = step.SquareHasPiece();
      // console.log('has piece', hasPiece);

      const isSameColor = logic.pieceIsSameColor(originalNode as Square, step as Square);
      // console.log('is same color', isSameColor);

      const isOtherColor = logic.pieceIsOtherColor(originalNode as Square, step as Square);
      // console.log(isOtherColor);

      if (hasPiece && isSameColor) 
      {
        return squares;
      }
    
      // account for if piece is black we just take that one and then end the logic loop. 
      if (hasPiece && isOtherColor) 
      {
          return [...squares, node, step];
      }


      let nextStep = NodeMutatorFactory(step as Square, crawlDirection) as Square;
      
      if (step)
        squares = [...squares, step];

      step = nextStep;
  }

  if (step)
    return [...squares, step]
  else 
    return squares
};

