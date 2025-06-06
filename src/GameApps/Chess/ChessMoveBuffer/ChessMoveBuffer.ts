import { Move, MoveState } from "./Move";

export class ChessMoveBuffer {
  private undoStack: MoveState[] = [];
  private redoStack: MoveState[] = [];

  public recordMove = (move: MoveState) => {
    this.undoStack.push(move);
    this.redoStack = [];
  };

  public deepUndo(): MoveState | null {
    if (this.undoStack.length === 0) return null;
    const lastMove = this.undoStack.pop()!;
    return lastMove;
  }

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

  get Moves(): MoveState[] {
    return this.undoStack;
  }

  get LastMove(): MoveState | null {

    if (this.undoStack.length === 0) 
      return null;

    return this.undoStack[this.undoStack.length - 1];
  }

  // any time of making moves but it's for testing and verifying a move is valid 
  // run the filterOutTestingMoves to get those testing manipulations out... 
  public filterOutTestingMoves = () => {
    this.undoStack = this.undoStack.filter((m: MoveState) => !m.testingMove);
    this.redoStack = this.redoStack.filter((m: MoveState) => !m.testingMove);
  }
}
