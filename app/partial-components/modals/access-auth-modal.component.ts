import { Component, trigger, transition, animate, style, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Const } from '../../utils/const';
import { DateTools } from '../../utils/utils';
import { AccessData } from '../../models/access-auth/access-data'
import { BaseModal } from './base-modal';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'access-auth-modal',
    templateUrl: `view/html/partial-components/modals/access-auth-modal.component.html`,
    styleUrls: ['view/css/partial-components/modals/access-auth-modal.component.css'],
    encapsulation: ViewEncapsulation.None //for css
})
export class AccessAuthModalComponent extends BaseModal {
    @Input() private accessData: AccessData; //can be new or edition
    @Input() private authorized: boolean;
    @ViewChild("fileLabel") private fileLabel: ElementRef;
    private accessDataAux: AccessData; //for edition 
    private accessDateTimeAux: string; //for edition

    constructor(private translate: TranslateService) {
        super();
    }

    public getFormData(): AccessData {
        if (this.validateForm()) {
            if (this.accessDateTimeAux) {
                this.accessDataAux.accessDate = DateTools.getDateTimeFromBigEndianString(this.accessDateTimeAux.toString(), '-', 'T', ':');
            }
            return this.accessDataAux;
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
        this.accessDataAux = <AccessData>new AccessData(<AccessData>this.accessData).clone();
        this.firstTime = true;
        //display
        //edition mode
        if (this.accessDataAux.accessDate) {
            this.accessDateTimeAux = DateTools.getBigEndianDateTimeString(this.accessDataAux.accessDate, '-', 'T', ':');
        }
    }

    public validateForm(): boolean {
        if (this.accessDataAux.department && this.accessDataAux.claimer && this.accessDateTimeAux
            && this.accessDataAux.area && this.accessDataAux.company && this.accessDataAux.driverName
            && this.accessDataAux.carRegistration && this.accessDataAux.material) {
            return true;
        }
        else {
            return false;
        }
    }

}