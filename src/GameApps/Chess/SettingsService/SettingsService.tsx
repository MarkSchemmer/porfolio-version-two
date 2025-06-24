import { Square } from "../board/Square";

class SettingsService {
    public moveableSquareColor: string = "pink";
    public selectedSquareColor: string = "gold";
    public darkColor: string = "#769656";
    public lightColor: string = "#eeeed2";

    public GetBackGroundColor = (sq: Square) => {
        const [x, y] = sq.mathematicalCoordinate;
        if (sq.SquareBgColor === this.moveableSquareColor || sq.SquareBgColor === this.selectedSquareColor) {
            return sq.SquareBgColor;
        } else {
            return (x + y) % 2 === 1 ? this.darkColor : this.lightColor;
        }
    }
}

export default new SettingsService();