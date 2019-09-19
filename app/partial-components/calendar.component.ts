import { Component, AfterViewInit, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BaseModalComponent } from './modals/base-modal.component';
import { CalendarOptions } from '../models/calendar/calendar-options';
import { CalendarEvent } from '../models/calendar/calendar-event';
import { CalendarEventToSave } from '../models/calendar/calendar-event-to-save';
import { CalendarItem } from '../models/calendar/calendar-item';
import { CalendarEventService } from '../services/calendar-event.service';
import { Const } from '../utils/const';
import { TranslateService } from 'ng2-translate';
import 'fullcalendar';
import 'locale-all';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { BaseReturn } from '../models/base/base-return';
import { SharedServices } from '../models/base/shared-services';
declare var $: any; //to use jquery

@Component({
    selector: 'calendar',
    templateUrl: `view/html/partial-components/calendar.component.html`,
    styleUrls: ['view/css/partial-components/calendar.component.css'],
    encapsulation: ViewEncapsulation.None //for overwrite calendar css
})
export class CalendarComponent implements AfterViewInit {
    @ViewChild('calendar') private calendar: ElementRef;
    @ViewChild('addEventModal') private addEventModal: BaseModalComponent;
    @ViewChild('eventInfoModal') private eventInfoModal: BaseModalComponent;
    @Input() private calendarOptions: CalendarOptions;
    @Input() private sharedData: SectionsSharedData;
    @Input() private sharedServices: SharedServices;
    //for calendar refresh after edit event at agenda
    @Output() private eventRefreshAction: EventEmitter<undefined> = new EventEmitter<undefined>();
    //for take at input
    private selectedDate: Date;
    private selectedEvent: CalendarEvent;
    //////

    constructor(private translate: TranslateService, private calendarEventService: CalendarEventService) { }

    ngAfterViewInit() {
        //does not exist calendar options var at constructor
        this.initCalendar();
        $(this.calendar.nativeElement).fullCalendar(this.calendarOptions);
    }

    private initCalendar() {
        this.setDefaultValues();
        //locale
        this.calendarOptions.locale = this.translate.currentLang;
    }

    private notDayClick(): boolean {
        return this.calendarOptions.dayClickBehaviour == Const.calendarBehaviour.NONE;
    }

    private setDefaultValues() {        
        //day click
        if (this.calendarOptions.dayClickBehaviour == Const.calendarBehaviour.DEFAULT) {
            if (this.calendarOptions.authorized) {
                //day click to add new event
                this.calendarOptions.dayClick = this.onDayClick.bind(this); //IMPORTANT: setting the binding of the context
            }
        }
        //event click
        if (this.calendarOptions.eventClickBehaviour == Const.calendarBehaviour.DEFAULT) {
            //event click to view info
            this.calendarOptions.eventClick = this.onEventClick.bind(this);
        }
        //day style
        if (this.calendarOptions.dayRenderStyle == Const.calendarBehaviour.DEFAULT) {
            //managing and changing days style
            this.calendarOptions.dayRender = this.dayRender.bind(this);
        } //custom setted at options constructor

        //month render (get month events)
        if (this.calendarOptions.viewRenderBehaviour == Const.calendarBehaviour.DEFAULT) {
            this.calendarOptions.viewRender = this.defaultMonthRender.bind(this);
        }
    }

    public onLocaleChanges(lang: string): void {
        $(this.calendar.nativeElement).fullCalendar('option', 'locale', lang);
        //let monthDate: Date = $(this.calendar.nativeElement).fullCalendar('getDate').toDate();
        //for language
        //this.refreshCalendarEvents(monthDate);
    }

    private onDayClick(date: any): void { //moment
        this.addEventModal.setVisible(true);
        //input
        this.selectedDate = date.toDate();
        this.selectedEvent =
            new CalendarEvent(this.selectedDate);
    }

    private onEventClick(event: Object): void { //lib event object        
        this.eventInfoModal.setVisible(true);
        //input
        this.selectedEvent = this.sharedData.getCalendarEvent(<number>event['id']);
    }

    public addEvent(newEvent: CalendarEvent): void {
        let eventToSave: CalendarEventToSave = new CalendarEventToSave(newEvent);
        let addEventPromise = this.calendarEventService.saveEvent(false, eventToSave, this.translate.currentLang);
        let self = this;
        addEventPromise.then(
            function (returnData: BaseReturn) {
                newEvent.id = returnData.id;
                self.sharedData.addCalendarEvent(newEvent);
                //get setted events
                self.refreshEventsFromView(self.sharedData.getCalendarItem().eventsData);
                //for agenda and calendar synch
                self.refreshCallback();
            }
        );
    }

    public editEvent(event: CalendarEvent): void {
        let eventToSave: CalendarEventToSave = new CalendarEventToSave(event);
        let editEventPromise = this.calendarEventService
            .saveEvent(true, eventToSave, this.translate.currentLang, event.id);
        let self = this;
        editEventPromise.then(
            function (returnData: BaseReturn) {
                self.sharedData.setCalendarEvent(event);
                //get setted events
                self.refreshEventsFromView(self.sharedData.getCalendarItem().eventsData);
                //for agenda and calendar synch
                self.refreshCallback();
            }
        );
    }

    private deleteEvent(event: CalendarEvent): void {
        let deleteEventPromise = this.calendarEventService.deleteEvent(event.id, this.translate.currentLang);
        let self = this;
        deleteEventPromise.then(
            function () {
                self.sharedData.removeCalendarEvent(event);
                //get setted events
                self.refreshEventsFromView(self.sharedData.getCalendarItem().eventsData);
                //for agenda and calendar synch
                self.refreshCallback();
            }
        );
    }

    public goToDate(date: any): void //moment
    {
        $(this.calendar.nativeElement).fullCalendar('gotoDate', date);
    }

    public getDate(): any //moment
    {
        return $(this.calendar.nativeElement).fullCalendar('getDate');
    }

    //called after event remove
    public refreshEventsFromView(events: CalendarEvent[] = null): void {
        $(this.calendar.nativeElement).fullCalendar('removeEvents');
        $(this.calendar.nativeElement).fullCalendar('renderEvents', events, true);
    }

    private dayRender(date: any, cell: any): void {
        let today: Date = new Date();
        let dateUTC: Date = date.toDate();
        today.setHours(0); //WARNING: utc fullcalendar bug
        today.setMinutes(0);
        today.setSeconds(0);
        dateUTC.setHours(0);

        if (dateUTC > today) {
            cell.css("background-color", "#DADAE7"); //grey
        }
    }

    private defaultMonthRender() {
        //start visible day  
        let monthDate: Date = $(this.calendar.nativeElement).fullCalendar('getDate').toDate();
        //get events of month        
        this.refreshCalendarEvents(monthDate);
    }

    public refreshCalendarEvents(date: Date): void {
        //get calendar events from DB              
        this.sharedServices.refreshCalendarEvents(date, this.refreshEventsFromView.bind(this), this.refreshCallback.bind(this));
    }

    private refreshCallback() {
        //for agenda and calendar synch
        if (this.eventRefreshAction) {
            this.eventRefreshAction.emit(undefined);
        }
    }

    // to call again day render
    public refreshAllView(): void //dayRender + monthRender
    {        
        $(this.calendar.nativeElement).fullCalendar('prev');
        $(this.calendar.nativeElement).fullCalendar('next');
    }
}