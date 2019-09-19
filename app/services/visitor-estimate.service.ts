import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VisitorEstimateItem } from "../models/visitor-estimate/visitor-estimate-item";
import { BaseService, Resource, ResItem } from "./base.service";
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { Utils } from '../utils/utils';
import { DailyInfoToSave } from '../models/visitor-estimate/dailyInfoToSave';
import { BaseReturn } from '../models/base/base-return';

@Injectable()
export class VisitorEstimateService extends BaseService {
    constructor(protected http: Http, protected router: Router) {
        super(http, router);
    }

    public getVisitorEstimateItem(date: Date, lang: string): Promise<VisitorEstimateItem> {
        let resource: Resource = new Resource([new ResItem('visitor', date.getFullYear().toString()), new ResItem(Utils.getTwoDigits((date.getMonth() + 1)))]);
        let resUrl = this.getCall(resource, lang);
        return this._get(resUrl);
    }

    public saveDailyInfo(exists: boolean, dailyInfo: DailyInfoToSave, lang: string): Promise<BaseReturn> {
        let resource = new Resource([(new ResItem('visitor'))]);
        let resUrl = this.getCall(resource, lang);
        if (exists) { //already setted (update)
            let resource = new Resource([(new ResItem('visitor', dailyInfo.dailyInfo.toString()))]);
            let resUrl = this.getCall(resource, lang);
            return this._put(dailyInfo, resUrl);
        }
        return this._post(dailyInfo, resUrl);
    }

    public deleteDailyInfo(dailyInfo: number, lang:string): Promise<BaseReturn> {
        let resource = new Resource([new ResItem('visitor', dailyInfo.toString())]);
        let resUrl = this.getCall(resource, lang);
        return this._delete(resUrl);
    }

}
