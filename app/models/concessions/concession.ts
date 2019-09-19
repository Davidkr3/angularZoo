import { Licensee } from './licensee';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';

export class Concession extends BaseModel {
    constructor() {
        super();             
    }
    description: string;
    licensees: Licensee[];

    public fromJSON(c: any) {                
        Object.assign(this, c);
        return this;
    }
}