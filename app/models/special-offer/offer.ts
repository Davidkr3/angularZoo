import { BaseModel } from '../base/base-model';


export class Offer extends BaseModel {
    constructor(_offer: Offer = null) {
        super();
        if (_offer) {
            this.offer = _offer.offer;
            this.code = _offer.code;
            this.name = _offer.name;
            this.price = _offer.price;
            this.expiration = _offer.expiration;
            this.noValid = _offer.noValid;
            this.observations = _offer.observations;
            this.file = _offer.file;
        }
    }
    public offer: number; //PK
    public code: string;
    public name: string;
    public price: number;
    public expiration: Date;
    public noValid: string;
    public observations: string;
    public file: string; //base64

    public fromJSON(o: any): BaseModel {
        Object.assign(this, <Offer>o);
        return this;
    }
}