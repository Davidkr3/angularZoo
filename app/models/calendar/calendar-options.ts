import { CalendarEvent } from './calendar-event';
import { CalendarHeader } from './calendar-header';

export class CalendarOptions {
    constructor(_aspectRatio: Number, _header: CalendarHeader, _defaultView: string,
        _section: string, _small: boolean, _authorized: boolean,
        _displayEventTime: boolean, _dayRenderStyle: string, _dayRender: Function,
        _dayClickBehaviour: string, _dayClick: Function, _events: CalendarEvent[],
        _eventClickBehaviour: string, _viewRenderBehaviour: string, _monthRender: Function) { //null: default

        this.aspectRatio = _aspectRatio;
        this.editable = false;  //no
        this.events = [];
        this.timezone = 'local'; //navigator timezone
        this.header = _header;
        this.defaultView = _defaultView;
        this.section = _section;
        this.dayClick = _dayClick;
        this.dayClickBehaviour = _dayClickBehaviour;
        this.small = _small;
        this.authorized = _authorized;
        this.dayRenderStyle = _dayRenderStyle;
        this.dayRender = _dayRender;
        this.events = _events;
        this.displayEventTime = _displayEventTime;
        this.eventClickBehaviour = _eventClickBehaviour;
        this.viewRenderBehaviour = _viewRenderBehaviour;
        this.viewRender = _monthRender;
    }
    aspectRatio: Number;
    events: CalendarEvent[];
    locale: string;
    editable: boolean;
    dayClick: Function;
    eventClick: Function;
    header: CalendarHeader;
    timezone: string;
    defaultView: string;
    section: string; //for events        
    small: boolean;
    displayEventTime: boolean;
    authorized: boolean;
    dayRender: Function; //triggered when generating days
    dayRenderStyle: string;
    dayClickBehaviour: string;
    eventClickBehaviour: string;    
    viewRenderBehaviour: string; //month, week....
    viewRender: Function;
}
