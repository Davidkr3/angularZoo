import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CalendarItem } from "../models/calendar/calendar-item";
import { CalendarEventToSave } from "../models/calendar/calendar-event-to-save";
import { Const } from "../utils/const";
import { Utils } from "../utils/utils";
import { BaseService, Resource, ResItem } from "./base.service";
import { BaseReturn } from '../models/base/base-return';
import { Router } from '@angular/router';

@Injectable()
export class CalendarEventService extends BaseService {
    constructor(protected http: Http, protected router: Router) {
        super(http, router);
    }

    public getEvents(date: Date, lang: string): Promise<CalendarItem> {
        let resource = new Resource([new ResItem('events', (date.getFullYear().toString())), new ResItem(Utils.getTwoDigits((date.getMonth() + 1)))]);
        let resUrl = this.getCall(resource, lang);
        return this._get(resUrl);
    }

    public saveEvent(exists: boolean, eventSave: CalendarEventToSave, lang: string, calendarEventId: number = null): Promise<BaseReturn> {
        if (exists) { //already setted (update)
            let resource = new Resource([(new ResItem('events', calendarEventId.toString()))]);
            let resUrl = this.getCall(resource, lang);
            return this._put(eventSave, resUrl);
        }
        let resource = new Resource([(new ResItem('events'))]);
        let resUrl = this.getCall(resource, lang);
        return this._post(eventSave, resUrl);
    }

    public deleteEvent(eventId: number, lang:string) {
        let resource = new Resource([new ResItem('events', eventId.toString())]);
        let resUrl = this.getCall(resource, lang);
        return this._delete(resUrl);
    }

}
