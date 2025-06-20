import { MoveState } from "./Move";

export class ChessMoveBuffer {
  private undoStack: MoveState[] = [];
  private redoStack: MoveState[] = [];

  public recordMove = (move: MoveState) => {
    move.currentMove = true;
    const lastMove = this.LastMove;
    if (lastMove) lastMove.currentMove = false;

    this.undoStack.push(move);
    this.redoStack = [];
  };

  public deepUndo(): MoveState | null {
    if (this.undoStack.length === 0) return null;
    const lastMove = this.undoStack.pop()!;
    this.resetCurrentMove();
    return lastMove;
  }

  public undo(): MoveState | null {
    if (this.undoStack.length === 0) return null;
    const lastMove = this.undoStack.pop()!;
    this.redoStack.push(lastMove);
    this.resetCurrentMove();
    return lastMove;
  }

  public redo(): MoveState | null {
    if (this.redoStack.length === 0) return null;
    const redoMove = this.redoStack.pop()!;
    this.undoStack.push(redoMove);
    this.resetCurrentMove();
    return redoMove;
  }

  public resetCurrentMove = () => {
    this.undoStack.forEach((m: MoveState) => {
      m.currentMove = false;
    });

    this.redoStack.forEach((m: MoveState) => {
      m.currentMove = false;
    });

    const lastMove = this.LastMove;

    if(lastMove) lastMove.currentMove = true;
  }

  public reset = () => {
    this.undoStack = [];
    this.redoStack = [];
  };

  get Moves(): MoveState[] {
    return this.undoStack;
  }

  get AllMoves(): MoveState[] {
    return [...this.undoStack, ...this.redoStack];
  }

  get LastMove(): MoveState | null {
    if (this.undoStack.length === 0) return null;

    return this.undoStack[this.undoStack.length - 1];
  }

  // any time of making moves but it's for testing and verifying a move is valid
  // run the filterOutTestingMoves to get those testing manipulations out...
  public filterOutTestingMoves = () => {
    this.undoStack = this.undoStack.filter((m: MoveState) => !m.testingMove);
    this.redoStack = this.redoStack.filter((m: MoveState) => !m.testingMove);
  };
}
