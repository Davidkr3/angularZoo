import { Component, ViewChild, ElementRef, Input, ViewChildren } from '@angular/core';
import { User } from '../models/user/user';
import { DailyInfo } from '../models/visitor-estimate/dailyInfo';
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { CalendarComponent } from '../partial-components/calendar.component';
import { CalendarOptions } from '../models/calendar/calendar-options';
import { CalendarHeader } from '../models/calendar/calendar-header';
import { BaseModalComponent } from '../partial-components/modals/base-modal.component';
import { Const } from '../utils/const';
import { DateTools } from '../utils/utils';
import { CalendarEvent } from '../models/calendar/calendar-event';
import { VisitorEstimateService } from '../services/visitor-estimate.service';
import { VisitorEstimateItem } from '../models/visitor-estimate/visitor-estimate-item';
import { BaseReturn } from '../models/base/base-return';
import { DailyInfoToSave } from '../models/visitor-estimate/dailyInfoToSave';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/visitor-estimate.component.html`,
  styleUrls: ['view/css/sections/visitor-estimate.component.css']
})
export class VisitorEstimateComponent extends BaseSection {
  //calendar input
  private calendarOptions: CalendarOptions;
  @ViewChild(CalendarComponent) private calendar: CalendarComponent;
  @ViewChild('addDailyInfoModal') private addDailyInfoModal: BaseModalComponent;
  @ViewChild('dailyInfoModal') private dailyInfoModal: BaseModalComponent;

  //for take at input
  private selectedDate: Date; //not really needed
  private selectedDay: DailyInfo;
  //////  
  private reRenderDaysMode: boolean;

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData,
    protected visitorService: VisitorEstimateService, protected sharedServices: SharedServices) {

    super(translate, sharedData, sharedServices);
    this.initCalendar();
    //each time we access to the view, context is setted
    this.sharedData.setContext(this);
    this.reRenderDaysMode = false;
  }

  private initCalendar() {
    ///        
    this.calendarOptions = new CalendarOptions(
      1.1,
      new CalendarHeader('title', '', 'today, prev, next'),
      'month',
      null,
      Const.calendarSize.BIG,
      this.isUserAuthorized(),
      false, //event time
      Const.calendarBehaviour.CUSTOM, //day background
      this.dayRender.bind(this),
      Const.calendarBehaviour.CUSTOM, //dayclick
      this.onDayClick.bind(this), //dayclick and event clik 
      null, //events rendered on month render
      Const.calendarBehaviour.NONE, //event click
      Const.calendarBehaviour.CUSTOM, //month render (events)
      this.monthRender.bind(this)
    );
  }

  private getVisitorDataItems(): CalendarEvent[] {
    let visitorEstimateItems: CalendarEvent[] = [];
    let id: number = 0;
    for (let day of this.sharedData.getVisitorEstimateItem().days) {
      let visitorEstimateDailyItem: CalendarEvent = new CalendarEvent();
      visitorEstimateDailyItem.id = id;
      //increment      
      id++;
      visitorEstimateDailyItem.title = day.visitorEstimate.toString();
      visitorEstimateDailyItem.start = DateTools.getBigEndianDateTimeString(day.date, "-", null, null);
      visitorEstimateDailyItem.end = DateTools.getBigEndianDateTimeString(day.date, "-", null, null);
      visitorEstimateDailyItem.confirmed = true;
      visitorEstimateDailyItem.color = Const.colors.color;
      visitorEstimateItems.push(visitorEstimateDailyItem);

      //trick to put after sharedData.getVisitorEstimateItem()
      let dateReal: Date = new Date(day.date);
      dateReal.setHours(dateReal.getHours() + 1);
      let visitorRealDailyItem: CalendarEvent = new CalendarEvent();
      visitorRealDailyItem.id = id;
      //increment
      id++;
      visitorRealDailyItem.title = day.visitorReal.toString();
      visitorRealDailyItem.start = DateTools.getBigEndianDateTimeString(dateReal, '-', ' ', ':');
      visitorRealDailyItem.end = DateTools.getBigEndianDateTimeString(dateReal, '-', ' ', ':');
      visitorRealDailyItem.confirmed = true;
      visitorRealDailyItem.color = day.visitorReal < day.visitorEstimate ? Const.colors.colorAlert : Const.colors.colorOK; //needed
      visitorEstimateItems.push(visitorRealDailyItem);
    }
    return visitorEstimateItems;
  }

  public isUserAuthorized(): boolean {
    if (this.sharedServices.getLoggedUser()) {
      if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.VISITOR_ESTIMATE_MANAGER)
        || this.sharedServices.isUserSuperAdminWriter()) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  //need to implement if the compopnent has a calendar
  public onLocaleChanges(lang: string): void {
    this.calendar.onLocaleChanges(lang);
    this.sharedServices.refreshVisitorEstimateData(this.translate.currentLang, this.calendar.getDate().toDate(), this.refreshCallback.bind(this));
  }

  private saveDailyInfo(_dailyInfo: DailyInfo): void {
    //edit
    //CAUTION!: 0 is false
    let dailyInfoToSave: DailyInfoToSave = new DailyInfoToSave(_dailyInfo);
    if (_dailyInfo.dailyInfo != undefined) {
      //save at BE
      let self = this;
      // Exists (PUT)
      let savePromise: Promise<BaseReturn> = this.visitorService.saveDailyInfo(true, dailyInfoToSave, this.translate.currentLang);
      savePromise.then(
        function (_response: BaseReturn) {
          let index: number = self.sharedData.getVisitorEstimateItem().days.indexOf(self.sharedData.getVisitorEstimateItem().days.find(x => x.dailyInfo == _dailyInfo.dailyInfo));
          self.sharedData.getVisitorEstimateItem().days[index] = _dailyInfo;
          //refresh       
          self.calendar.refreshEventsFromView(self.getVisitorDataItems());
          //only render view days
          self.reRenderDaysMode = true;
          self.calendar.refreshAllView();
          self.reRenderDaysMode = false;
        }
      );
    }
    //add
    else {
      //save at BE
      // Don't Exists (POST)
      let self = this;
      let savePromise: Promise<BaseReturn> = this.visitorService.saveDailyInfo(false, dailyInfoToSave, this.translate.currentLang);
      savePromise.then(
        function (_response: BaseReturn) {
          _dailyInfo.dailyInfo = _response.id;
          //    
          self.sharedData.getVisitorEstimateItem().days.push(_dailyInfo);
          //events & background      
          self.calendar.refreshEventsFromView(self.getVisitorDataItems());
          //only render view days
          self.reRenderDaysMode = true;
          self.calendar.refreshAllView();
          self.reRenderDaysMode = false;
        }
      );
    }

  }

  private deleteDailyInfo(_dailyInfo: DailyInfo): void {
    let self = this;
    let deletePromise: Promise<BaseReturn> = this.visitorService.deleteDailyInfo(_dailyInfo.dailyInfo, this.translate.currentLang);
    deletePromise.then(
      function (_response: BaseReturn) {
        let index: number = self.sharedData.getVisitorEstimateItem().days.indexOf(self.sharedData.getVisitorEstimateItem().days.find(x => x.dailyInfo == _dailyInfo.dailyInfo));
        self.sharedData.getVisitorEstimateItem().days.splice(index, 1);
        //view
        self.calendar.refreshEventsFromView(self.getVisitorDataItems());
        self.reRenderDaysMode = true;
        self.calendar.refreshAllView();
        self.reRenderDaysMode = false;
      }
    );

  }

  private onDayClick(date: any): void { //moment    
    if (this.isUserAuthorized()) {
      //input
      this.selectedDate = date.toDate();
      this.selectedDate.setHours(0);
      //exist?
      this.selectedDay = this.sharedData.getVisitorEstimateItem().days.find(x => x.date.getTime() == this.selectedDate.getTime());
      if (!this.selectedDay) {
        //add
        this.selectedDay = new DailyInfo();
        this.selectedDay.date = this.selectedDate;
        this.addDailyInfoModal.setVisible(true);
      }
      else {
        //edit
        this.dailyInfoModal.setVisible(true);
      }
    }
  }

  private dayRender(date: any, cell: any): void {
    if (this.sharedData.getVisitorEstimateItem().days) {
      //rendering day date
      let dateRendered: Date = date.toDate();
      //compare only date
      dateRendered.setHours(0);
      for (let day of this.sharedData.getVisitorEstimateItem().days) {
        //compare only date
        day.date.setHours(0);
        if (dateRendered.getTime() == day.date.getTime()) {
          cell.css("background-color", this.sharedData.getVisitorEstimateItem().comboEventualities.find(x => x.id == day.eventuality).color);
        }
      }
    }
  }

  private monthRender(): void {
    //to prevent infinite loop refreshData calling
    if (!this.reRenderDaysMode) {
      this.sharedServices.refreshVisitorEstimateData(this.translate.currentLang, this.calendar.getDate().toDate(), this.refreshCallback.bind(this));
    }
  }

  protected refreshCallback(_visitorEstimateItem: VisitorEstimateItem): void {
    //data
    this.sharedData.setVisitorEstimateItem(_visitorEstimateItem);
    //view events
    this.calendar.refreshEventsFromView(this.getVisitorDataItems());
    //view days background
    //to prevent infinite loop refreshData calling
    //only render view days
    this.reRenderDaysMode = true;
    this.calendar.refreshAllView();
    this.reRenderDaysMode = false
  }

}
