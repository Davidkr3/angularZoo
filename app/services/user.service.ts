import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from "../models/user/user";
import { Login } from "../models/user/login";
import { BaseService, Resource, ResItem } from "./base.service";
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService {
    constructor(protected http: Http, protected router: Router) {
        super(http, router);
    }

    public getUser(lang: string): Promise<User> {
        let resource: Resource = new Resource([(new ResItem('user'))]);
        let resUrl = this.getCall(resource, lang);
        return this._get(resUrl);
    }

    public login(_login: Login): Promise<string> {
        let resource = new Resource([(new ResItem('login'))]);
        let resUrl = this.getCall(resource, '', true);
        return this._post(_login, resUrl);
    }

}
