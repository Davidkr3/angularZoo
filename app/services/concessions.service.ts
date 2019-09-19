import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConcessionsItem } from "../models/concessions/concessions-item";
import { LicenseeToSave } from "../models/concessions/licensee-to-save";
import { BaseService, Resource, ResItem } from "./base.service";
import { Router } from '@angular/router';

@Injectable()
export class ConcessionsService extends BaseService {
    constructor(protected http: Http, protected router: Router) {
        super(http, router);
    }

    getConcessionsItem(date: string, lang: string): Promise<ConcessionsItem> {
        let resource = new Resource([(new ResItem('concessions', date))]);
        let resUrl = this.getCall(resource, lang);
        return this._get(resUrl);
    }

    saveLicenseeInfo(exists: boolean, licensee: LicenseeToSave, lang: string): Promise<Object> {
        let resource = new Resource([(new ResItem('concessions'))]);
        let resUrl = this.getCall(resource, lang);
        if (exists) { //already setted (update)
            let resource = new Resource([(new ResItem('concessions'))]);
            let resUrl = this.getCall(resource, lang);
            return this._put(licensee, resUrl);
        }
        return this._post(licensee, resUrl);
    }

}
