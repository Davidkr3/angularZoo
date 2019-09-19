import { Component, trigger, transition, animate, style, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Const } from '../../utils/const';
import { DateTools } from '../../utils/utils';
import { DailyInfo } from '../../models/visitor-estimate/dailyInfo';
import { OfferToEdit } from '../../models/special-offer/offer-to-edit';
import { BaseModal } from './base-modal';
import { TranslateService } from 'ng2-translate';
import { ComboData } from '../../models/base/combo-data';

@Component({
    selector: 'add-daily-info-modal',
    templateUrl: `view/html/partial-components/modals/daily-info-modal.component.html`,
    styleUrls: ['view/css/partial-components/modals/daily-info-modal.component.css'],
    encapsulation: ViewEncapsulation.None //for css
})
export class DailyInfoModalComponent extends BaseModal {
    @Input() private day: DailyInfo; //can be new or edition
    @Input() private authorized: boolean;
    @Input() private selectedDate: Date;
    @Input() private comboEventualities: Array<ComboData>;
    private dayAux: DailyInfo; //for edition 

    constructor(private translate: TranslateService) {
        super();
    }

    public getFormData(): DailyInfo {
        if (this.validateForm()) {
            //patch
            this.dayAux.eventuality = Number.parseInt(this.dayAux.eventuality.toString());
            //
            return this.dayAux;
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
        this.dayAux = <DailyInfo>new DailyInfo(<DailyInfo>this.day).clone();
        this.firstTime = true;
    }

    public validateForm(): boolean {
        if (this.dayAux.eventuality != undefined && this.dayAux.visitorEstimate != undefined && this.dayAux.visitorReal != undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    private getSelectedDateString(): string {
        return DateTools.getInternationalizedDateTimeString(this.selectedDate, this.translate.currentLang, '/', null, null);
    }

}