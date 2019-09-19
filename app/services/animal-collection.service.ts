import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AnimalCollectionItem } from "../models/animal-collection/animal-collection-item";
import { AnimalInfo } from "../models/animal-collection/animal-info";
import { BaseService, Resource, ResItem } from "./base.service";
import { AnimalInfoToSave } from '../models/animal-collection/animal-info-to-save';
import { TranslateService } from 'ng2-translate';
import { BaseReturn } from '../models/base/base-return';
import { Router } from '@angular/router';

@Injectable()
export class AnimalCollectionService extends BaseService {
    constructor(protected http: Http, protected router: Router) {
        super(http, router);
    }

    public getAnimalCollectionItem(date: string, lang: string): Promise<AnimalCollectionItem> {
        let resource = new Resource([(new ResItem('animal', date))]);
        let resUrl = this.getCall(resource, lang);
        return this._get(resUrl);
    }

    public saveAnimalInfo(exists: boolean, animalSave: AnimalInfoToSave, lang: string, animalInfoId: number = null): Promise<BaseReturn> {
        if (exists) { //already setted (update)
            let resource = new Resource([(new ResItem('animal', animalInfoId.toString()))]);
            let resUrl = this.getCall(resource, lang);
            return this._put(animalSave, resUrl);
        }
        let resource = new Resource([(new ResItem('animal'))]);
        let resUrl = this.getCall(resource, lang);
        return this._post(animalSave, resUrl);
    }

    public deleteAnimalInfo(animalInfoId: number, lang:string) {
        let resource = new Resource([(new ResItem('animal', animalInfoId.toString()))]);
        let resUrl = this.getCall(resource, lang);
        return this._delete(resUrl);
    }

}
