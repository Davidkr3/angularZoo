import { ConstConfig } from "../config/const.config";
import { Response } from '@angular/http';
import { Headers, Http } from '@angular/http';
import { WebStorage } from '../utils/web-storage';
import { Exception } from '../models/base/exception';
import { Router } from '@angular/router';

export class Resource {
    constructor(_items: ResItem[]) {
        this.items = _items
    }
    public items: ResItem[];
}
export class ResItem {
    constructor(_resource: string, _value: string = '') {
        this.resource = _resource;
        this.value = _value;
    }
    public resource: string;
    public value: string;
}

export class BaseService {
    protected baseURL: string;
    protected headers: Headers;

    constructor(protected http: Http, protected router: Router) {
        this.baseURL = ConstConfig.API_ENDPOINT;  // URL to web api
        this.buildHeaders();
    }

    private buildHeaders() { //used at getUser
        this.headers = new Headers();
        //optional login
        if (WebStorage.getToken()) {
            //btoa: base64 encoding
            this.headers.append('Authorization', "Basic " + btoa(WebStorage.getToken()));
        }
        this.headers.append("Content-Type", "application/json");
    }

    protected getCall(resource: Resource, lang: string, isLogin: boolean = false): string {
        let resURL: string = this.baseURL + "/" + lang;
        if (isLogin) {
            resURL = ConstConfig.API_ENDPOINT_LOGIN;
        }
        for (let item of resource.items) {
            resURL = resURL.concat("/" + item.resource);
            if (item.value) {
                resURL = resURL.concat("/" + item.value);
            }
        }
        return resURL;
    }

    protected _get(resUrl: string) : Promise<any> {
        this.buildHeaders();
        let promise = this.http.get(resUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json()) //(no data object)
            .catch(this.handleError.bind(this));
        return promise;
    }

    protected _post(content: any, resUrl: string) {
        this.buildHeaders();
        let promise = this.http
            .post(resUrl, JSON.stringify(content), { headers: this.headers, })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError.bind(this));
        return promise;
    }

    protected _put(content: any, resUrl: string) {
        this.buildHeaders();
        let promise = this.http
            .put(resUrl, JSON.stringify(content), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError.bind(this));
        return promise;
    }

    protected _delete(resUrl: string) {
        this.buildHeaders();
        let promise = this.http
            .delete(resUrl, { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError.bind(this));
        return promise;
    }

    protected handleError(error: Response): Promise<never> {
        //session
        if (error["statusText"] == ConstConfig.SESSION_EXPIRATION_STATUS) {
            this.sessionExpiration();
            return null;
        }
        else {
            try {
                //for example: login error
                let errDesc: string = "";
                errDesc = JSON.parse(error["_body"]).status.description;
                return Promise.reject(new Exception(errDesc)); //emit to function requester catch
            }
            catch (e) {
                //all other errors
                console.error('An error occurred', error);
                return null;
            }
        }
    }

    private sessionExpiration(): void {
        //like logout
        WebStorage.deleteUser();
        WebStorage.deleteToken();
        this.router.navigate(['login']);
    }
}
