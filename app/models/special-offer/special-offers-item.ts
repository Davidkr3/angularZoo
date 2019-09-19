import { SpecialOfferSection } from './special-offer-section';
import { BaseModel } from '../base/base-model';

export class SpecialOffersItem extends BaseModel {
    constructor() {
        super();     
    }    
    private offerSections: SpecialOfferSection[];

    public fromJSON(s: any): BaseModel {         
        Object.assign(this, <SpecialOfferSection>s);
        return this;
    }
}