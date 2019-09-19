import { Component, trigger, transition, animate, style, Input, ViewEncapsulation } from '@angular/core';
import { Const } from '../../utils/const';
import { DateTools } from '../../utils/utils';
import { CalendarEvent } from '../../models/calendar/calendar-event';
import { ComboData } from '../../models/base/combo-data';
import { BaseModal } from './base-modal';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'add-calendar-event-modal',
    templateUrl: `view/html/partial-components/modals/calendar-event-modal.component.html`,
    styleUrls: ['view/css/partial-components/modals/calendar-event-modal.component.css'],
    encapsulation: ViewEncapsulation.None //for css
})
export class CalendarEventModalComponent extends BaseModal {
    @Input() private selectedDate: Date;
    @Input() private dateChange: boolean; //to set if date should be changable    
    @Input() private mode: string;
    @Input() private event: CalendarEvent; //can be new or edition
    @Input() private authorized: boolean;
    @Input() private comboSections: ComboData[];

    private eventAux: CalendarEvent; //for edition 
    private logicDatesErrmMsg = '';
    private startTimeAux: string;

    constructor(private translate: TranslateService) {
        super();
        //init
        this.eventAux = new CalendarEvent();
    }

    private getSelectedDateString(): string {
        return DateTools.getInternationalizedDateTimeString(this.selectedDate, this.translate.currentLang, '/', null, null);
    }

    private getSelectedStartDateTime(_time:string):Date {
        //start time edition (not date)
        let auxTime: Date = DateTools.getTimeFromString(_time);
        let auxDate:Date = new Date(this.selectedDate);
        auxDate.setHours(auxTime.getHours());
        auxDate.setMinutes(auxTime.getMinutes());
        return auxDate;
    }

    public getFormData(): CalendarEvent {
        if (this.validateForm()) {
            //patch
            this.eventAux.section.id = this.comboSections.find(x => x.name == this.eventAux.section.name).id;
            this.eventAux.color = this.comboSections.find(x => x.name == this.eventAux.section.name).color;
            //refactor dates
            this.refactorModelDates();
            //prevent from reference modification before save at BE
            return this.eventAux;
        }
        else {
            //enable errors
            this.firstTime = false;
            return null;
        }
    }

    private refactorModelDates() {
        let startAux: string;
        //add (only can edit time)
        if (this.mode == "addEventModal") {
            this.selectedDate = this.getSelectedStartDateTime(this.startTimeAux);
            startAux = DateTools.getBigEndianDateTimeString(this.selectedDate, '-', ' ', ':');
        }
        else { //edit 
            startAux = DateTools.getBigEndianDateTimeString(DateTools.getDateTimeFromBigEndianString(this.eventAux.start, '-', 'T', ':'), '-', ' ', ':');
        }
        this.eventAux.start = startAux;
        this.eventAux.end =
            DateTools.getBigEndianDateTimeString(DateTools.getDateTimeFromBigEndianString(this.eventAux.end, '-', 'T', ':'), '-', ' ', ':');
        //confirmed edited outside
    }

    private setSelectedCalendarDateFromBigEndianString(dateString: string) {
        this.selectedDate = DateTools.getDateTimeFromBigEndianString(dateString, '-', ' ', ':');
    }

    public resetForm() {
        //double constructor simulated
        this.eventAux = <CalendarEvent>(new CalendarEvent(null, this.event)).clone(); //must use "new" here       
        if (this.mode == "addEventModal") {
            this.startTimeAux = DateTools.getTimeFromDate(DateTools.getDateTimeFromBigEndianString(this.event.start, '-', 'T', ':'), ":");
        }
        else {
            //to add T separator to format returned by fullcalendar
            this.eventAux.start = DateTools.getBigEndianDateTimeString(DateTools.getDateTimeFromBigEndianString(this.event.start, '-', ' ', ':'), '-', 'T', ':');
            this.eventAux.end = DateTools.getBigEndianDateTimeString(DateTools.getDateTimeFromBigEndianString(this.event.end, '-', ' ', ':'), '-', 'T', ':');
        }
        ///
        this.firstTime = true;
    }

    public validateForm(): boolean {
        //for submit
        //all conditions at the same time
        if (this.eventAux.title && this.eventAux.start && this.eventAux.end && this.eventAux.section) {
            if (!this.checkDatesLogic()) {
                this.logicDatesErrmMsg = this.translate.get('calendar.addEvent.error.logicDatesErrmMsg')['value'];
                return false;
            }
            else {
                this.logicDatesErrmMsg = '';
                return true;
            }
        }
        else {
            return false;
        }
    }

    private checkDatesLogic(): boolean {
        if (this.mode == "addEventModal") {
            //start time with date         
            if (this.getSelectedStartDateTime(this.startTimeAux).getTime()
                > DateTools.getDateTimeFromBigEndianString(this.eventAux.end, '-', 'T', ':').getTime()) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            //edition mode
            if (DateTools.getDateTimeFromBigEndianString(this.eventAux.start, '-', 'T', ':').getTime()
                > DateTools.getDateTimeFromBigEndianString(this.eventAux.end, '-', 'T', ':').getTime()) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    //for view
    private getInternationalisedSelectedDate(): string {
        return DateTools.getInternationalizedDateTimeString(
            this.selectedDate, this.translate.currentLang, '/', null, null); //no time
    }

    //for view 
    private setSelectedDate(date: Date) {
        this.selectedDate = date;
    }

}