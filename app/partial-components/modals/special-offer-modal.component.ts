import { Component, trigger, transition, animate, style, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Const } from '../../utils/const';
import { DateTools } from '../../utils/utils';
import { Offer } from '../../models/special-offer/offer';
import { OfferToEdit } from '../../models/special-offer/offer-to-edit';
import { BaseModal } from './base-modal';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'add-special-offer-modal',
    templateUrl: `view/html/partial-components/modals/special-offer-modal.component.html`,
    styleUrls: ['view/css/partial-components/modals/special-offer-modal.component.css'],
    encapsulation: ViewEncapsulation.None //for css
})
export class OfferModalComponent extends BaseModal {
    @Input() private offer: Offer; //can be new or edition
    @Input() private authorized: boolean;
    @ViewChild("fileLabel") private fileLabel: ElementRef;
    private offerAux: Offer; //for edition 
    private expirationAux: string; //for edition

    constructor(private translate: TranslateService) {
        super();
    }

    public getFormData(): Offer {
        if (this.validateForm()) {
            if (this.expirationAux) {
                this.offerAux.expiration = DateTools.getDateTimeFromBigEndianString(this.expirationAux.toString(), '-', 'T', ':');
            }
            return this.offerAux;
        }
        else {
            //enable errors
            this.firstTime = false;
            return null;
        }
    }

    //called from parent
    public resetForm() {
        //reset
        this.offerAux = <Offer>new Offer(<Offer>this.offer).clone();
        this.firstTime = true;
        //display
        //edition mode
        if (this.offerAux.expiration) {
            this.expirationAux = DateTools.getBigEndianDateTimeString(this.offerAux.expiration, '-', 'T', ':');
        }
    }

    public validateForm(): boolean {
        if (this.offerAux.code && this.offerAux.name) {
            return true;
        }
        else {
            return false;
        }
    }

    private attatchFile(file: File, offer: number) {
        //change might be cancelled
        if (file) {
            let fileReader: FileReader = new FileReader();
            let base64Encoded: string;
            //show file attatched
            this.fileLabel.nativeElement.innerHTML = file["name"];
            fileReader.readAsDataURL(file);
            let self = this;
            fileReader.onload = () => {
                base64Encoded = fileReader.result;
                //save file
                this.offerAux.file = base64Encoded;
                //TODO: save at BE            
            }
        }
    }

}