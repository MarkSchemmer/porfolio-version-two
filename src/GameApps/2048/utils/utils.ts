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
        // ${this.point.x} - ${this.point.y} \n
        ctx.fillText((this.point ? ` ${(this.value ? this.value : "")}` : "").toString(), x + (this.resolution / 2), y + (this.resolution / 1.8));
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
        positionOnBoard.dataBlob.value = 2;
        this.Board[2][1] = positionOnBoard;

        let pos2 = this.Board[1][2];
        pos2.dataBlob = new DataBlob(pos2.point, pos2.resolution);
        pos2.dataBlob.value = 2;
        this.Board[1][2] = pos2;

        // maniuplate a row which is up and down Y-axis
        this.Board[0].map(i => { 
            i.dataBlob = new DataBlob(i.point, i.resolution);
            i.dataBlob.bakcgroundColor = "green"
            return i;
        });

        // manipulate a column which is left to right or X-axis
        let column = this.getColumn(0).forEach(i => {
            //i.dataBlob = new DataBlob(i.point, i.resolution);
            i.dataBlob.bakcgroundColor = "blue"
        })

    }

    public getRow = (idx:number) => {
        return this.Board[idx];
    }

    public getColumn = (idx: number) => {
        let column = [];

        for (let i = 0; i < this.Board.length; i++) {
            column.push(this.Board[i][idx]);
        }

        return column;
    }

    public setColumn = (idx: number, column: TwentyFortyEightRectangle[], copyOfBoard: TwentyFortyEightRectangle[][]) => {
        for (let i = 0; i < this.Board.length; i++) {
            copyOfBoard[i][idx] = column[i];
        }
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
        let newBoard = this.DeepCopyTwentyEightBoard();
        let columnsToShift = [ 0, 1, 2, 3 ];
        let fm: boolean[] = [];

        columnsToShift.forEach(i => {
            let column = this.getColumn(i).map(r => r.DeepCopy2048());
            let values = column.map(x => x.dataBlob.value).filter(isValue);
            let {row, foundMatch} = shiftValuesLeft(values, 4);

            let oldBoardColumn = this.getColumn(i);
            let hc = !oldBoardColumn.every((r, idx) => r.dataBlob.value === column[idx].dataBlob.value);
            fm.push(foundMatch);
            fm.push(hc)

            column = column.map((r, ii) => (r.dataBlob.value = row[ii], r));

            this.setColumn(i, column, newBoard);

        });

        let hasChanged = this.hasBoardChanged(this.Board, newBoard);
        console.log(hasChanged);
        this.Board = newBoard;

        if (hasChanged || fm.some(i => i === true)) this.generateRandomValueOf2And4();

    }

    public shiftRight = () => {
        let newBoard = this.DeepCopyTwentyEightBoard();
        let columnsToShift = [ 0, 1, 2, 3 ];
        let fm: boolean[] = [];

        columnsToShift.forEach(i => {
            let column = this.getColumn(i).map(r => r.DeepCopy2048());
            let values = column.map(x => x.dataBlob.value).filter(isValue);
            let {row, foundMatch} = shiftValuesRight(values, 4);

            let oldBoardColumn = this.getColumn(i);
            let hc = !oldBoardColumn.every((r, idx) => r.dataBlob.value === column[idx].dataBlob.value);
            fm.push(foundMatch);
            fm.push(hc)

            column = column.map((r, ii) => (r.dataBlob.value = row[ii], r));

            this.setColumn(i, column, newBoard);

        });


        let hasChanged = this.hasBoardChanged(this.Board, newBoard);
        console.log(hasChanged);
        this.Board = newBoard;

        if (hasChanged || fm.some(i => i === true)) this.generateRandomValueOf2And4();
    }

    public shiftDown = () => {
        // this is basically Y-axis shift down is to the right
        let fm: boolean[] = [];
        let newBoard = this.DeepCopyTwentyEightBoard();
        
        
        newBoard.map((YaxisRow, i) => {
            let values = YaxisRow.map(y=> y.dataBlob.value).filter(isValue);
            let {row, foundMatch} = shiftValuesRight(values, 4);
            fm.push(foundMatch);
            let newYaxisRow = YaxisRow.map((y, idx) => (y.dataBlob.value = row[idx], y));
            return newYaxisRow;
        });

        let hasChanged = this.hasBoardChanged(this.Board, newBoard);
        console.log(hasChanged);
        this.Board = newBoard;

        if (hasChanged || fm.some(i => i === true)) this.generateRandomValueOf2And4();
    }

    public shiftUp = () => {
        // this is basically Y-axis shift up is to the left 
        let fm: boolean[] = [];
        let newBoard = this.DeepCopyTwentyEightBoard().map((YaxisRow, i) => {
            let values = YaxisRow.map(y=> y.dataBlob.value).filter(isValue);
            let {row, foundMatch} = shiftValuesLeft(values, 4);
            fm.push(foundMatch);
            let newYaxisRow = YaxisRow.map((y, idx) => (y.dataBlob.value = row[idx], y));
            return newYaxisRow;
        });

        let hasChanged = this.hasBoardChanged(this.Board, newBoard);
        console.log(hasChanged);
        this.Board = newBoard;

        if (hasChanged || fm.some(i => i === true)) this.generateRandomValueOf2And4();

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

    public hasBoardChanged = (oldBoard: TwentyFortyEightRectangle[][], newBoard: TwentyFortyEightRectangle[][]) => {
        for (let x = 0; x < oldBoard.length; x++) {
            for (let y = 0; y < oldBoard[x].length; y++) {
                if (oldBoard[y][x].dataBlob.value !== newBoard[y][x].dataBlob.value) {
                    return true;
                }
            }
        }

        return false;
    }

    // re-write this to just use brute force in the future. 
    public generateRandomValueOf2And4 = () => {
        let arr = [ 2, 4 ];
        let randomNewInteger = arr[getRandomInt(1)];


        let x,y;

        let counter = 0;

        do {
            x = getRandomInt(4);
            y = getRandomInt(4);
            if (!IsValue(this.Board[x][y].dataBlob.value)) {
                this.Board[x][y].dataBlob.value = randomNewInteger;
                return;
            }
        }
        while (!IsValue(this.Board[x][y].dataBlob.value) && counter++ < 100)
    }

    // Going to need to fix the shif left and right on the game. 
    // mutating the screen results is wrong and broken. 

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
    let ar = arr.filter(isValue);
    let len = ar.length;
    let newArr = [...Array(4 - len)].map(i => null);
    return shiftRowLeft([...ar, ...newArr]);
}

export const shiftValuesRight = (arr:any, expectedLen:number) => {
    let ar = arr.filter(isValue);
    let len = ar.length;
    let newArr = [...Array(4 - len)].map(i => null);
    return shiftRowRight([...newArr, ...ar]);
}

type ComplexRightCalculation = {
    newArr: any[];
    shouldSkip: boolean;
}

const newComplexRightCalculation: ComplexRightCalculation = {
    newArr: [],
    shouldSkip: false
}


/*
    Note: 

    TwentyFortyEightCalculationForShiftingRight and for TwentyFortyEightCalculationForShiftingLeft

    You're going to need to move the shifting of arrays towards the top of the calculation

    so it's 

    shift then calc 
*/

export const TwentyFortyEightCalculationForShiftingRight = (arr:any): any => {
    // console.log(ar);
    let res: ComplexRightCalculation = arr.reduceRight((acc:ComplexRightCalculation, currentVal:any, idx:number, array:any) => {
        let nextVal = array[idx-1];

        if (acc.shouldSkip) {
            return {
                ...acc,
                shouldSkip:false
            }
        } 

        if (currentVal === nextVal && currentVal != null) {

            const nextComplexCalc: ComplexRightCalculation = {
                newArr: [...acc.newArr, currentVal + nextVal],
                shouldSkip: true
            };

            return nextComplexCalc;
        } else {
            const nextComplexCalcElse : ComplexRightCalculation = {
                newArr: [...acc.newArr, currentVal], shouldSkip: false
            };

            return nextComplexCalcElse;
        }
    }, newComplexRightCalculation);

    return shiftValuesRight(res.newArr, 4);
}

export const convertZeroToNull = (row: number[]) => {
    return row.map(i => i === 0 ? null : i);
}

export const shiftRowRight = (row: number[]) => {
    row = row.filter(isValue);
    let foundMatch = false;
    for (let i = row.length - 1; i > 0; i--) {
        if (row[i] === row[i - 1]) {
            row[i] *= 2;
            foundMatch = true;
            row[i - 1] = 0;
        }
    }

    row = row.filter(element => element !== 0);

    while (row.length < 4) {
        row.unshift(0);
    }


    let r = convertZeroToNull(row);

    return { row : r, foundMatch };
}

export const shiftRowLeft = (row: number[]) => {
    let foundMatch = false;
    row = row.filter(isValue);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            foundMatch = true;
            row[i + 1] = 0;
        }
    }

    row = row.filter(element => element !== 0);

    while (row.length < 4) {
        row.push(0);
    }

    let r = convertZeroToNull(row);

    return { row: r, foundMatch };
}

export const TwentyFortyEightCalculationForShiftingLeft = (arr:any): any => {
    let res: ComplexRightCalculation = arr.reduceRight((acc:ComplexRightCalculation, currentVal:any, idx:number, array:any) => {
        let nextVal = array[idx-1];

        if (acc.shouldSkip) {
            return {
                ...acc,
                shouldSkip:false
            }
        } 

        if (currentVal === nextVal && currentVal != null) {

            const nextComplexCalc: ComplexRightCalculation = {
                newArr: [...acc.newArr, currentVal + nextVal],
                shouldSkip: true
            };

            return nextComplexCalc;
        } else {
            const nextComplexCalcElse : ComplexRightCalculation = {
                newArr: [nextVal, ...acc.newArr], shouldSkip: false
            };

            return nextComplexCalcElse;
        }
    }, newComplexRightCalculation);

    return shiftValuesLeft(res.newArr, 4);
}


