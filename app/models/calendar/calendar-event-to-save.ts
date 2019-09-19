import { BaseModel } from '../base/base-model';
import { CalendarEvent } from './calendar-event';

export class CalendarEventToSave extends BaseModel {
    constructor(_calendarEvent: CalendarEvent = null) { //default to create default CalendarEvent
        super();
        if (_calendarEvent) {
            this.title = _calendarEvent.title;
            this.start = _calendarEvent.start;
            this.end = _calendarEvent.end;
            this.section = _calendarEvent.section.id;
            this.confirmed = _calendarEvent.confirmed;
        }
    }
    title: string;
    start: string; //must be string
    end: string; //must be string
    section: number; //to get from list
    confirmed: boolean;
}
