import { Injectable } from '@angular/core';
import { BaseSection } from '../../sections/base-section';
import { AnimalCollectionItem } from '../animal-collection/animal-collection-item';
import { AccessAuthItem } from '../access-auth/access-auth-item';
import { ConcessionsItem } from '../concessions/concessions-item';
import { User } from '../user/user';
import { WebStorage } from '../../utils/web-storage';
import { CalendarItem } from '../calendar/calendar-item';
import { CalendarEvent } from '../calendar/calendar-event';
import { Const } from '../../utils/const';
import { TranslateService } from 'ng2-translate';
import { UserService } from '../../services/user.service';
import { Login } from '../user/login';
import { ConstConfig } from "../../config/const.config";
import { ComboData } from './combo-data';
import { SpecialOffersItem } from '../special-offer/special-offers-item';
import { DateTools } from '../../utils/utils';
import { AnimalCollectionService } from '../../services/animal-collection.service';
import { CalendarEventService } from '../../services/calendar-event.service';
import { AnimalInfo } from '../../models/animal-collection/animal-info';
import { VisitorEstimateItem } from '../../models/visitor-estimate/visitor-estimate-item';
import { VisitorEstimateService } from '../../services/visitor-estimate.service';

@Injectable() //shared project
export class SectionsSharedData {
    private context: BaseSection; //to enable sharing data between route elements
    private selectedDate: Date;
    //for each selected date
    private animalCollectionItem: AnimalCollectionItem;
    private concessionsItem: ConcessionsItem;
    private calendarItem: CalendarItem;
    private specialOffersItem: SpecialOffersItem;
    private accessAuthItem: AccessAuthItem;
    private visitorEstimateItem: VisitorEstimateItem;

    constructor(private translate: TranslateService, private userService: UserService, private animalService: AnimalCollectionService,
        private calendarEventService: CalendarEventService, private visitorService: VisitorEstimateService) {
        if (!this.selectedDate) {
            this.selectedDate = new Date(); //init to current date
            this.selectedDate.setHours(0, 0, 0, 0); //only date
        }
        this.animalCollectionItem = new AnimalCollectionItem();
        this.concessionsItem = new ConcessionsItem();
        this.calendarItem = new CalendarItem();
        this.specialOffersItem = new SpecialOffersItem();
        this.accessAuthItem = new AccessAuthItem();
        this.visitorEstimateItem = new VisitorEstimateItem();
    }   

    public setContext(_context: BaseSection): void {
        this.context = _context;
    }
    public getContext(): BaseSection {
        return this.context;
    }
    public setSelectedDate(_selectedDate: Date): void {
        this.selectedDate = _selectedDate;
    }
    public getSelectedDate(): Date {
        return this.selectedDate;
    }
    public getAccessAuthItem(): AccessAuthItem {
        return this.accessAuthItem;
    }
    public setAccessAuthItem(_accessAuthItem: AccessAuthItem): void {
        this.accessAuthItem = _accessAuthItem;
    }
    public getConcessions(): ConcessionsItem {
        return this.concessionsItem;
    }
    public setConcessions(_concessions: ConcessionsItem): void {
        this.concessionsItem = _concessions;
    }
    public getSpecialOffers(): SpecialOffersItem {
        return this.specialOffersItem;
    }
    public setSpecialOffers(_specialOffers: SpecialOffersItem): void {
        this.specialOffersItem = _specialOffers;
    }
    public getAnimalCollection(): AnimalCollectionItem {
        return this.animalCollectionItem;
    }
    //to get all animal info
    public getAnimalInfoData(): AnimalInfo[] {
        let animalInfoData: AnimalInfo[] = [];
        for (let categoryData of this.animalCollectionItem.categoriesData) {
            for (let animalInfo of categoryData.animalInfo) {
                animalInfoData.push(animalInfo);
            }
        }
        return animalInfoData;
    }

    public setAnimalCollection(_animalCollectionItem: AnimalCollectionItem): void {
        this.animalCollectionItem = _animalCollectionItem;
    }
    
    public getCalendarItem(): CalendarItem {
        return this.calendarItem;
    }

    public setCalendarItem(_calendarItem: CalendarItem): void {
        this.calendarItem = _calendarItem;
    }

    public getDailyCalendarEvents(_date: Date): CalendarEvent[] {
        //returns current calendar events for selected date        
        return this.calendarItem.eventsData.filter(x => DateTools.getDateTimeFromBigEndianString(x.start, "-", null, null).getTime() <= _date.getTime()
            && DateTools.getDateTimeFromBigEndianString(x.end, "-", null, null).getTime() >= _date.getTime());
    }
    public addCalendarEvent(_calendarEvent: CalendarEvent): void {
        this.calendarItem.eventsData.push(_calendarEvent);
    }
    public removeCalendarEvent(_calendarEvent: CalendarEvent): void {
        let index: number = this.calendarItem.eventsData.indexOf(this.calendarItem.eventsData.find(x => x.id == _calendarEvent.id));
        this.calendarItem.eventsData.splice(index, 1);
    }
    public setCalendarEvent(_calendarEvent: CalendarEvent): void {
        let index: number = this.calendarItem.eventsData.indexOf(this.calendarItem.eventsData.find(x => x.id == _calendarEvent.id));
        this.calendarItem.eventsData[index] = _calendarEvent;
    }

    public getCalendarEvent(_calendarEventId: number) {
        let index: number = this.calendarItem.eventsData.indexOf(this.calendarItem.eventsData.find(x => x.id == _calendarEventId));
        return this.calendarItem.eventsData[index];
    }

    public setVisitorEstimateItem(_visitorEstimateItem: VisitorEstimateItem): void {
        this.visitorEstimateItem = _visitorEstimateItem;
    }
    public getVisitorEstimateItem(): VisitorEstimateItem {
        return this.visitorEstimateItem;
    }   

}
