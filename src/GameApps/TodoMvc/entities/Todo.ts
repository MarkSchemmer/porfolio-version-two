import { e2 } from "../../../Utils/Util";

export class Todo {
    public str: string = ""
    public id: string = e2 ();
    public completed: boolean = false;
    
    constructor(txt: string) {
        this.str = txt;
    }
}