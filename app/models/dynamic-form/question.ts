export class Question {
    constructor() {
    }

    public question: number;
    public statement: string;
    public type: string; //field type
    public optionsList: string[]; //possible answers at select case    
    public answer: string; //user input    

    public fromJSON(ff: any) { //JSON
        Object.assign(this, ff);
        return this;
    }

    public isTypeText(): boolean {
        return this.type == "text";
    }

    public isTypeNumber(): boolean {
        return this.type == "number";
    }

    public isTypeSelect(): boolean {
        return this.type == "select";
    }

}
