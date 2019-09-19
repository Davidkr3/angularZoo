import { BaseModel } from '../base/base-model';
import { Question } from '../dynamic-form/question';

export class LicenseeToSave extends BaseModel {
    public selectedDate: string;
    public untilDate: string;
    public licensee: number;  
    public questions: Question[];    
}   