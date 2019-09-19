import { Concession } from './concession';
import { ComboData } from '../base/combo-data';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';


export class ConcessionsItem extends BaseModel {
    constructor(_date: Date = undefined) {
        super();      
    }
    
    private concessionsData: Concession[];

    public fromJSON(c: any): ConcessionsItem {
        Object.assign(this, <ConcessionsItem>c);
        return this;
    }
}