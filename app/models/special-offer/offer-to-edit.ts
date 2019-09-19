import { BaseModel } from '../base/base-model';
import { Offer } from './offer';
import { DateTools } from '../../utils/utils';

export class OfferToEdit extends BaseModel {
    constructor(_offer: Offer = null) {
        super();
        if (_offer) {
            this.code = _offer.code;
            this.name = _offer.name;
            this.price = _offer.price;
            this.expiration = DateTools.getBigEndianDateTimeString(_offer.expiration, '-', 'T', ':');
            this.noValid = [];
            this.observations = _offer.observations;
        }
    }
    public offer: number; //PK
    public code: string;
    public name: string;
    public price: number;
    public expiration: string;
    public noValid: string[];
    public observations: string;
    public file: string; //base64
}