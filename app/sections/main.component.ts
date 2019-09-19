import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { SharedServices } from '../models/base/shared-services';
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { ConstConfig } from '../config/const.config';
import { VisitorEstimateItem } from '../models/visitor-estimate/visitor-estimate-item';
declare var $: any; //to use jquery

@Component({
  templateUrl: `view/html/sections/main.component.html`,
  styleUrls: ['view/css/sections/main.component.css']
})
export class MainComponent extends BaseSection implements AfterViewInit {
  @ViewChild('weatherWidget') weatherWidget: ElementRef;
  private oldDocumentWriteBehaviour: any;
  private visitorEstimateNumber: number;

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData, protected sharedServices: SharedServices) {
    super(translate, sharedData, sharedServices);
    //each time we access to the view, context is setted
    this.sharedData.setContext(this);
  }

  public ngAfterViewInit() {
    //save document.write behaviour
    this.oldDocumentWriteBehaviour = document.write;
    this.loadWeatherWidget(this.translate.currentLang);
  }

  private loadWeatherWidget(lang: string) {
    //WEATHER WIDGET
    //remove if already created
    if (this.weatherWidget.nativeElement.firstElementChild) {
      $(this.weatherWidget.nativeElement).empty();
    }
    //overloading document write behaviour (in angular is not allowed)
    document.write = this.documentWrite.bind(this);
    //including third party weather script
    var weatherSource = document.createElement("script");
    weatherSource.type = "text/javascript";
    weatherSource.src = ConstConfig.WEATHER_WIDGET + lang + ConstConfig.WEATHER_WIDGET2;
    //uses document write
    this.weatherWidget.nativeElement.appendChild(weatherSource);
  }

  private documentWrite(content: string): void {
    this.weatherWidget.nativeElement.appendChild($.parseHTML(content)[0]);
    //restore document write behaviour
    document.write = this.oldDocumentWriteBehaviour;
  }

  public isUserAuthorized(): boolean {
    return true;
  }

  //getting all required data
  protected refreshData(lang: string): void {
    this.sharedServices.refreshAnimalCollection(lang);
    this.sharedServices.refreshCalendarEvents(this.sharedData.getSelectedDate(), null, null);

    this.sharedServices.refreshVisitorEstimateData(this.translate.currentLang, this.sharedData.getSelectedDate(), this.refreshVisitorCallback.bind(this));
  }

  public refreshVisitorCallback(visitorEstimateItem: VisitorEstimateItem) {
    let dailyinfo = visitorEstimateItem.days.find(v => v.date.getTime() == this.sharedData.getSelectedDate().getTime());
    if (dailyinfo) {
      this.visitorEstimateNumber = dailyinfo.visitorEstimate;
    } else {
      this.visitorEstimateNumber = null;
    }
  }

  //need to implement if the compopnent has a calendar
  public onLocaleChanges(lang: string): void {
    //lang for prevent first time bug 
    this.loadWeatherWidget(lang);
  }


}