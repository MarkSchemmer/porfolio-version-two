import { IsValue, KeyPressArrowValues, Point, Rectangle, getRandomInt, isValue, range } from "../../../Utils/Util";


export class DataBlob {
    public point:Point;
    public value: number | null = null;
    public bakcgroundColor = "#eee4da";
    public fontColor = "black";
    public resolution: number;
    public spacing: number = 5;
    constructor(p: Point, resolution: number) {
        this.point = p;
        // this.value = this.generateRandomTwoOr4();
        this.resolution = resolution;
    }

    public setDataValue = () => {}

    public generateRandomTwoOr4 = () => {
        let range = [2, 4];
        let randomIdx = getRandomInt(1);
        return range[randomIdx];
    }

    public draw = (ctx: any) => {
        ctx.beginPath();
        ctx.fillStyle = this.bakcgroundColor;
        this.fillRect(ctx);
        ctx.stroke();
    }

    public fillRect: (ctx: any) => void = (ctx:any) => {
        const x = this.point.x * (this.resolution + this.spacing) + this.spacing;
        const y = this.point.y * (this.resolution + this.spacing) + this.spacing;
        ctx.fillRect(x, y, this.resolution, this.resolution);
        ctx.font="20px Georgia";
        ctx.textAlign="center"; 
        ctx.fillStyle = "black";
        ctx.fillText((this.value ? this.value : "").toString(), x + (this.resolution / 2), y + (this.resolution / 1.8));
    }

    public DeepCopy = () => {
        let p = this.point.DeepCopy();
        let v = this.value;
        let bgc = this.bakcgroundColor;
        let fontColor = this.fontColor;
        let r = this.resolution;
        let spacing = this.spacing;

        let newBlob = new DataBlob(p, r);
        newBlob.value = v;
        newBlob.bakcgroundColor = bgc;
        newBlob.fontColor = fontColor;
        newBlob.spacing = spacing;
        return newBlob;
    }
}

export class TwentyFortyEightRectangle extends Rectangle {
    public hasBeenCalled: boolean = false;
    public spacing: number = 5;
    public dataBlob: DataBlob;
    constructor(p: Point, r: number) {
        super(p, r);
        let newBlob = new DataBlob(p, r);
        this.dataBlob = newBlob;
    }

    public changeXOfnextSquare = () => {
        if (this.hasBeenCalled === false) {
            this.point.x += 1;
            this.point.y += 1;
            this.hasBeenCalled = true;
        }
    }

    public DeepCopy2048 = () => {
        let p = this.point.DeepCopy();
        let r = this.resolution;
        let hasBeenCalled = this.hasBeenCalled;
        let spacing = this.spacing;
        let dataBlob = this.dataBlob.DeepCopy();

        let rect = new TwentyFortyEightRectangle(p, r);

        rect.hasBeenCalled = hasBeenCalled;
        rect.spacing = spacing;
        rect.dataBlob = dataBlob;

        return rect;
    }


    // Very important to take notes of this in the future, spacing between squares. 
    // This is important because I can create a sort of 2048 grid layout.
    public strokeRectWithoutAdditionalRes: (ctx: any) => void = (ctx:any) => {
        const x = this.point.x * (this.resolution + this.spacing) + this.spacing;
        const y = this.point.y * (this.resolution + this.spacing) + this.spacing;
        ctx.strokeRect(x, y, this.resolution, this.resolution);
    }

    // if the grid is populated it's self we will have to draw that as well. 
    // And things are getting easier. Then to determin when a transition happens... 
    // Every grid rectangle has an point, an x, y -> then we create the transition... 
    // Basically  when a shift happpens -> we properly animate from (x, y) to (x, y)...


}

type Board = TwentyFortyEightRectangle[][];

export const GenerateTwentyFortyEightBoard = () => {
    return range(1, 4).map((x) => range(1, 4).map((y) => new TwentyFortyEightRectangle(new Point(x, y), 75)));
}

export class TwentyFortyEightBoard {
    public Board: Board = GenerateTwentyFortyEightBoard();
    constructor() {
        // start with two points or at least 1 point
        let positionOnBoard = this.Board[2][1];
        positionOnBoard.dataBlob = new DataBlob(positionOnBoard.point, positionOnBoard.resolution);
        positionOnBoard.dataBlob.value = 8;
        this.Board[2][1] = positionOnBoard;

        let pos2 = this.Board[1][2];
        pos2.dataBlob = new DataBlob(pos2.point, pos2.resolution);
        pos2.dataBlob.value = 10;
        this.Board[1][2] = pos2;
    }
    // I'm needing to determine where to generate a new square once a translation has happened.
    // Basically if going left -> we need to generate a 2 or 4 but on the right side, or 
    // opposite of the translation.
    public getOppositeSideOfTranslation = (direction: KeyPressArrowValues) => {
        let left = KeyPressArrowValues.LEFT, right = KeyPressArrowValues.RIGHT, 
        up = KeyPressArrowValues.UP, down = KeyPressArrowValues.DOWN;

        if (direction === left) return right;
        else if (direction === right) return left;
        else if (direction === up) return down;
        else if (direction === down) return up;
        // major issue if none of these are return... Might just throw an error or return null.
        // for right now I will throw an error. 
        throw new Error("invalid direction. ");
    }

    public shiftLeft = () => {

        let board = this.DeepCopyTwentyEightBoard();
        let getRow = (row: number) => {
            return board.map(xrow => {
                return xrow[row].dataBlob.value;
            }).filter(isValue);
        }

        
        let shiftedValuesLeftRow0 = shiftValuesLeft((getRow(0)), 4);
        let shiftedValuesLeftRow1 = shiftValuesLeft((getRow(1)), 4);
        let shiftedValuesLeftRow2 = shiftValuesLeft((getRow(2)), 4);
        let shiftedValuesLeftRow3 = shiftValuesLeft((getRow(3)), 4);
        

        board.forEach((rl, idx) => {
            rl[0].dataBlob.value = shiftedValuesLeftRow0[idx];
            rl[1].dataBlob.value = shiftedValuesLeftRow1[idx];
            rl[2].dataBlob.value = shiftedValuesLeftRow2[idx];
            rl[3].dataBlob.value = shiftedValuesLeftRow3[idx];
        });

        this.Board = board;
    }

    public shiftRight = () => {
        let board = this.DeepCopyTwentyEightBoard();
        let getRow = (row: number) => {
            return board.map(xrow => {
                return xrow[row].dataBlob.value;
            }).filter(isValue);
        }

        
        let shiftedValuesLeftRow0 = shiftValuesRight((getRow(0)), 4);
        let shiftedValuesLeftRow1 = shiftValuesRight((getRow(1)), 4);
        let shiftedValuesLeftRow2 = shiftValuesRight((getRow(2)), 4);
        let shiftedValuesLeftRow3 = shiftValuesRight((getRow(3)), 4);
        

        board.forEach((rl, idx) => {
            rl[0].dataBlob.value = shiftedValuesLeftRow0[idx];
            rl[1].dataBlob.value = shiftedValuesLeftRow1[idx];
            rl[2].dataBlob.value = shiftedValuesLeftRow2[idx];
            rl[3].dataBlob.value = shiftedValuesLeftRow3[idx];
        });

        this.Board = board;
    }

    public shiftDown = () => {
        // this is basically
        let newBoard = this.DeepCopyTwentyEightBoard();
        this.Board = newBoard.map((rl:TwentyFortyEightRectangle[]) => {
            let shiftedUp = rl.map((r:TwentyFortyEightRectangle) => r.dataBlob.value).filter(isValue);
            let shiftedDown = shiftValuesRight(shiftedUp, 4);
            let newcopy = rl.map((r:TwentyFortyEightRectangle) => r.DeepCopy2048());
            return newcopy.map((r: TwentyFortyEightRectangle, i: number) => {
                try {
                    r.dataBlob.value = shiftedDown[i];
                } catch(e) {
                    r.dataBlob.value = null;
                }

                return r;
            });
        });
    }

    public shiftUp = () => {
        // this is basically
        let newBoard = this.DeepCopyTwentyEightBoard();
        this.Board = newBoard.map((rl:TwentyFortyEightRectangle[]) => {
            let shiftedUp = rl.map((r:TwentyFortyEightRectangle) => r.dataBlob.value).filter(isValue);
            let newcopy = rl.map((r:TwentyFortyEightRectangle) => r.DeepCopy2048());
            return newcopy.map((r: TwentyFortyEightRectangle, i: number) => {
                try {
                    r.dataBlob.value = shiftedUp[i];
                } catch(e) {
                    r.dataBlob.value = null;
                }

                return r;
            });
        });
    }

    // When drawing the board... what is that going to look like...?
    // We need a special background.
    // Padding between every square
    // an animation for maniuplation of our board
    // So the square gently slides over... instead of an extreme shift...
    public draw = (ctx: any) => {
        this.Board.forEach((lr: TwentyFortyEightRectangle[])=> {
            lr.forEach((r: TwentyFortyEightRectangle) => {
                r.strokeRectWithoutAdditionalRes(ctx);
                if (r.dataBlob) {
                    r.dataBlob.draw(ctx);
                }
            });
        })
    }

    public handleArrowKeyPress = (e: KeyboardEvent) => {
        let left = KeyPressArrowValues.LEFT, right = KeyPressArrowValues.RIGHT, 
        up = KeyPressArrowValues.UP, down = KeyPressArrowValues.DOWN;
        let val = e.key.toString().toLocaleLowerCase();
        if (val === left) { this.shiftLeft(); }
        else if (val === right) { this.shiftRight(); }
        else if (val === down) {this.shiftDown(); }
        else if (val === up) { this.shiftUp(); }
    }

    public DeepCopyTwentyEightBoard = () => {
        const newboard = this.Board.map((rl: TwentyFortyEightRectangle[]) => {
                let copyOfRl = rl.map((r:TwentyFortyEightRectangle) => {
                        return r.DeepCopy2048();
                });

                return copyOfRl;
        });

        return newboard;
    }
}

export const shiftValuesLeft = (arr:any, expectedLen:number) => {
    let len = arr.length;
    let newRange = range(1, expectedLen - len).map(i => null);
    return [...arr, ...newRange].filter((i, idx) => idx < expectedLen);
}

export const shiftValuesRight = (arr:any, expectedLen:number) => {
    let len = arr.length;
    let newRange = range(1, expectedLen - len).map(i => null);
    return [...newRange, ...arr].filter((i, idx) => idx < expectedLen);
}