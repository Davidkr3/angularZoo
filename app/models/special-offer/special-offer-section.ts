import { Offer } from './offer';
import { BaseModel } from '../base/base-model';

export class SpecialOfferSection extends BaseModel {
    constructor() {
        super();     
    }
    public type: string;
    public offers: Offer[];

    public fromJSON(s: any): BaseModel {         
        Object.assign(this, <SpecialOfferSection>s);
        return this;
    }
}