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
  diagonalBackRight = "diagonalBackRight",
}

export const NodeMutatorFactory = (node: Square, direction: DirectionCrawl) => {
  switch (direction) {
    case DirectionCrawl.left: {
      return node?.left;
    }
    case DirectionCrawl.right: {
      return node?.right;
    }
    case DirectionCrawl.forward: {
      return node?.forward;
    }
    case DirectionCrawl.back: {
      return node?.back;
    }
    case DirectionCrawl.diagonalLeft: {
      return node?.diagonalLeft;
    }
    case DirectionCrawl.diagonalRight: {
      return node?.diagonalRight;
    }
    case DirectionCrawl.diagonalBackLeft: {
      return node?.diagonalBackLeft;
    }
    case DirectionCrawl.diagonalBackRight: {
      return node?.diagonalBackRight;
    }
    default: {
      // log and track just in case.
    }
  }

  return null;
};

export const NodeCrawler = (
  node: Square | undefined,
  logic: PieceLogicService,
  crawlDirection: DirectionCrawl
): any => {
  // I could make this quicker by understanding
  // if I can make a light weight check, pin, or imobile 
  // logic interface then we can check and determine 
  // which moves are possible which will make the 
  // scanning and calculaiton process so much faster

  const originalNode = node;
  let squares: Square[] = [];

  let step = NodeMutatorFactory(node as Square, crawlDirection);

  while (logic.isValue(step)) {
    if (logic.IsNullOrUndefined(node)) {
      return squares;
    }
    // test if forward square has a piece
    // if it does and it's the same color
    // break the function and return what we have
    // console.log(isOtherColor);

    if (
      logic.SquareHasPieceAndIsSameColor(originalNode as Square, step as Square)
    ) {
      return squares;
    }

    // need to account for pin as well, if piece moves does it create a check?
    // account for if piece is black we just take that one and then end the logic loop.
    if (
      logic.SquareHasPieceAndIsOtherColor(
        originalNode as Square,
        step as Square
      )
    ) {
      return [...squares, step];
    }

    // if movement causes check end this and return value
    // update nodeCrawler 

    let nextStep = NodeMutatorFactory(step as Square, crawlDirection) as Square;

    if (step) squares = [...squares, step];

    step = nextStep;
  }

  if (step) return [...squares, step];
  else return squares;
};
