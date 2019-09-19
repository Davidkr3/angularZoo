import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Licensee } from '../models/concessions/licensee';
import { Concession } from '../models/concessions/concession';
import { LicenseeToSave } from '../models/concessions/licensee-to-save';
import { ConcessionsService } from '../services/concessions.service';
import { TranslateService } from 'ng2-translate';
import { FormTemplateComponent } from '../partial-components/dynamic-form/form-template.component';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { Question } from '../models/dynamic-form/question';
import { Const } from '../utils/const';
import { DateTools } from '../utils/utils';
import { SharedServices } from '../models/base/shared-services';

@Component({
    selector: 'concession-licensee',
    templateUrl: `view/html/partial-components/concession-licensee.component.html`,
    styleUrls: ['view/css/partial-components/concession-licensee.component.css']
})
export class ConcessionLicenseeComponent implements OnInit {
    @ViewChild(FormTemplateComponent) private formTemplateSingleElement: FormTemplateComponent;
    @Input() private selectedConcession: Concession;
    @Input() private sharedData: SectionsSharedData;
    @Input() private sharedServices: SharedServices;
    @Input() private licensee: Licensee;
    //modification until date
    private untilDate: Date;

    constructor(protected translate: TranslateService, private concessionsService: ConcessionsService) { }

    public ngOnInit(): void {
        this.untilDate = this.sharedData.getSelectedDate();
    }

    private saveLicenseeData(_licensee: Licensee): void {        
        //by reference
        _licensee.questions = this.formTemplateSingleElement.getFormFieldsTyped();
        //edit
        this.concessionsService.saveLicenseeInfo(true, this.getLicenseeToSave(_licensee), this.translate.currentLang);
    }

    private getLicenseeToSave(licensee: Licensee): LicenseeToSave {
        let l: LicenseeToSave = new LicenseeToSave();
        l.selectedDate = DateTools.getBigEndianDateTimeString(this.sharedData.getSelectedDate(), '/', null, null);
        l.untilDate = DateTools.getBigEndianDateTimeString(this.untilDate, '/', null, null);
        l.licensee = licensee.licensee;        
        l.questions = licensee.questions;
        return l;
    }

    private setUntilDate(_untilDate: Date): void {
        this.untilDate = _untilDate;
    }

    public isUserAuthorized(): boolean {
        //authorized by each licensee
        if (this.sharedServices.getLoggedUser()) {
            if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.CONCESSIONS_MANAGER[this.licensee.licensee])
                || this.sharedServices.isUserSuperAdminWriter()) {
                return true;
            }
        }
        else {
            //(GUEST IS NOT AN AUTHORIZED USER)
            return false;
        }
    }

}