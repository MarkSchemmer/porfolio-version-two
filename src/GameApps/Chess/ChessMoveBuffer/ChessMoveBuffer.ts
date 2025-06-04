import { Move, MoveState } from "./Move";

export class ChessMoveBuffer {
  private undoStack: Move[] = [];
  private redoStack: Move[] = [];

  public recordMove = (move: MoveState) => {
    this.undoStack.push(move);
    this.redoStack = [];
  };

  public undo(): MoveState | null {
    if (this.undoStack.length === 0) return null;
    const lastMove = this.undoStack.pop()!;
    this.redoStack.push(lastMove);
    return lastMove;
  }

  public redo(): MoveState | null {
    if (this.redoStack.length === 0) return null;
    const redoMove = this.redoStack.pop()!;
    this.undoStack.push(redoMove);
    return redoMove;
  }

  public reset = () => {
    this.undoStack = [];
    this.redoStack = [];
  };

  get Moves(): Move[] {
    return this.undoStack;
  }

  // any time of making moves but it's for testing and verifying a move is valid 
  // run the filterOutTestingMoves to get those testing manipulations out... 
  public filterOutTestingMoves = () => {
    this.undoStack = this.undoStack.filter((m: Move) => !m.testingMove);
    this.redoStack = this.redoStack.filter((m: Move) => !m.testingMove);
  }
}
