import { Component, ViewChild } from '@angular/core';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { CalendarComponent } from '../partial-components/calendar.component';
import { CalendarOptions } from '../models/calendar/calendar-options';
import { CalendarHeader } from '../models/calendar/calendar-header';
import { CalendarEvent } from '../models/calendar/calendar-event';
import { BaseModalComponent } from '../partial-components/modals/base-modal.component';
import { Const } from '../utils/const';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/events.component.html`,
  styleUrls: ['view/css/sections/events.component.css']
})
export class EventsComponent extends BaseSection {
  private calendarOptions: CalendarOptions; //calendar input  
  private agendaOptions: CalendarOptions; //calendar input  
  @ViewChild("calendar") private calendar: CalendarComponent;
  @ViewChild("agenda") private agenda: CalendarComponent;
  @ViewChild('addEventModal') private addEventModal: BaseModalComponent;
  //input calendar modal  
  private selectedEvent: CalendarEvent;
  private selectedDate: Date; //for view access

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData,
    protected sharedServices: SharedServices) {

    super(translate, sharedData, sharedServices);
    this.initCalendars();
    //each time we access to the view, context is setted
    this.sharedData.setContext(this);
    this.selectedDate = new Date(); //today
  }

  private initCalendars() {
    this.calendarOptions = new CalendarOptions(
      1,
      new CalendarHeader('title', '', 'month, agendaWeek, agendaDay, listYear, today, prev, next'),
      'month',
      null,
      Const.calendarSize.BIG,
      true, //not default behaviour (always authorized)     
      true, //event time
      Const.calendarBehaviour.DEFAULT, //day background view
      null, //day render default
      Const.calendarBehaviour.NONE, //dayclick
      null,
      null,
      Const.calendarBehaviour.NONE, //event click
      Const.calendarBehaviour.CUSTOM, //month render (events)
      this.monthRender.bind(this)
    );
    //overload
    //agenda calendar
    this.agendaOptions = new CalendarOptions(
      1,
      new CalendarHeader('title', '', ''),
      'listMonth',
      null,
      Const.calendarSize.BIG,
      this.isUserAuthorized(),
      true, //event time
      Const.calendarBehaviour.DEFAULT,
      null,
      Const.calendarBehaviour.DEFAULT,
      null,
      null,
      Const.calendarBehaviour.DEFAULT, //event click
      Const.calendarBehaviour.NONE, //view refresh
      null
    );
  }

  private onAddEventButtonClick() {
    this.selectedEvent = new CalendarEvent(this.selectedDate);
    this.addEventModal.setVisible(true);
  }

  private addEvent(newEvent: CalendarEvent) {
    this.agenda.addEvent(newEvent);
  }

  //need to implement if the compopnent has a calendar
  public onLocaleChanges(lang: string): void {
    this.calendar.onLocaleChanges(lang);
    this.agenda.onLocaleChanges(lang);
  }

  public isUserAuthorized(): boolean {
    if (this.sharedServices.getLoggedUser()) {
      if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.EDUCATION_MANAGER)
        || this.sharedServices.isUserSuperAdminWriter()) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  //refresh events after add/delete at both calendars
  private calendarEventRefresh() {
    //get setted events
    this.calendar.refreshEventsFromView(this.sharedData.getCalendarItem().eventsData);
  }

  //refresh events month render
  private agendaEventRefresh() {
    //get setted events
    this.agenda.refreshEventsFromView(this.sharedData.getCalendarItem().eventsData);
  }

  private monthRender(): void {
    //get events of month        
    this.calendar.refreshCalendarEvents(this.calendar.getDate().toDate());
    //set date to agenda
    this.agenda.goToDate(this.calendar.getDate());
  }


}