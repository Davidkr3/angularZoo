import { BaseModel } from '../base/base-model';
import { Question } from '../dynamic-form/question';

export class Licensee extends BaseModel {
    constructor(_licensee: Licensee = null) {
        super();
        if (_licensee) {
            this.licensee = _licensee.licensee;
            this.name = _licensee.name;          
            this.questions = _licensee.questions;
            this.selected = _licensee.selected;
        }
    }

    public licensee: number;
    public name: string;   
    public questions: Question[];
    public selected: boolean;

    public fromJSON(l: Licensee): Licensee {
        Object.assign(this, l);
        return this;
    }
}