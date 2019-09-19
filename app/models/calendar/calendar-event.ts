import { DateTools } from '../../utils/utils';
import { Const } from '../../utils/const';
import { BaseModel } from '../base/base-model';
import { ComboData } from '../base/combo-data';

export class CalendarEvent extends BaseModel {
    constructor(_selectedDate: Date = null, _calendarEvent: CalendarEvent = null) { //default to create default CalendarEvent
        super();
        //default
        if (_selectedDate) {
            this.confirmed = false;
            this.start = DateTools.getBigEndianDateTimeString(_selectedDate, '-', 'T', ':');
            this.end = DateTools.getBigEndianDateTimeString(_selectedDate, '-', 'T', ':');
            this.section = new ComboData();
        }
        if (_calendarEvent) {
            this.id = _calendarEvent.id;
            this.title = _calendarEvent.title;
            this.start = _calendarEvent.start;
            this.end = _calendarEvent.end;
            this.section = _calendarEvent.section;
            this.confirmed = _calendarEvent.confirmed;
            this.color = _calendarEvent.color;
        }
    }

    public id: number; //to manage events at fullcalendar
    public title: string;
    public start: string; //must be string
    public end: string; //must be string
    public section: ComboData; //to get from list
    public confirmed: boolean;
    public color: string; //NEEDED (FULLCALENDAR EVENT OBJECT)

    public fromJSON(ce: any): CalendarEvent {
        Object.assign(this, <CalendarEvent>ce);
        return this;
    }
}