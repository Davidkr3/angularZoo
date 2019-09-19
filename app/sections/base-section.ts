import { OnInit } from '@angular/core';
import { WebStorage } from '../utils/web-storage';
import { BaseModel } from '../models/base/base-model';
import { DateTools } from '../utils/utils';
import { TranslateService } from 'ng2-translate';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { ConstConfig } from "../config/const.config";
import { SharedServices } from '../models/base/shared-services';

export abstract class BaseSection implements OnInit {

    constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData,
        protected sharedServices: SharedServices) {
    }

    public ngOnInit(): void {
        //all sections must refresh its data
        //guest login if no logged user
        if (!this.sharedServices.geUserToken()) {
            //CALLBACK WHEN LOGIN
            this.sharedServices.loginGuest(ConstConfig.GUEST_USER, ConstConfig.GUEST_PASSWD, this.refreshData.bind(this, this.translate.currentLang));
        }
        else {
            //if not overloaded, executes base model one (abstract)
            if (this.sharedData.getContext())
                this.refreshData(this.translate.currentLang);
        }
    }

    protected setSelectedDateFromBigEndianString(dateString: string) {
        this.sharedData.setSelectedDate(DateTools.getDateTimeFromBigEndianString(dateString, '-', ' ', ':'));
    }

    //for view
    protected getDateInternacionalized(date: Date): string {
        return DateTools.getInternationalizedDateTimeString(
            date, this.translate.currentLang, '/', null, null); //no time
    }

    protected getBigEndianStringInternationalized(date: string) {
        return DateTools.getInternationalizedDateTimeString(
            DateTools.getDateTimeFromBigEndianString(date, '-', ' ', ':'), this.translate.currentLang, '/', ' ', ':');
    }

    private setSelectedDate(_selectedDate: Date) {
        this.sharedData.setSelectedDate(_selectedDate);
        this.refreshData(this.translate.currentLang);
    }

    public onLocaleChanges(lang: string): void { } //method for overload. No abstract, no implementation mandatory

    public isUserAuthorized(): boolean { return true; } //to know if user is athorized for each section

    protected refreshData(lang: string): void { }
}