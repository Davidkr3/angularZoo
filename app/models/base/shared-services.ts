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
import { SectionsSharedData } from './sections-shared-data';

@Injectable() //shared project
export class SharedServices {

    constructor(private translate: TranslateService, private userService: UserService, private animalService: AnimalCollectionService,
        private calendarEventService: CalendarEventService, private visitorService: VisitorEstimateService, private sharedData: SectionsSharedData) {
    }

    public loginGuest(email: string, passwd: string, cb: Function) {
        let self = this;
        let login: Login = new Login(email, passwd);
        let loginPromise: Promise<string> = this.userService.login(login);
        loginPromise
            .then(function (_alfrescoObject: Object) {
                //TODO: remove (for developing)
                if (_alfrescoObject) {
                    let token: string = _alfrescoObject["data"]["ticket"];
                    WebStorage.setToken(token);
                }
                //refresh data for sections
                cb();
            });
    }

    public getLoggedUser(): User {
        return WebStorage.getUser();
    }

    //for view
    public geUserToken(): string {
        return WebStorage.getToken();
    }

    public isUserSuperAdminWriter(): boolean {
        return this.getLoggedUser().role.some(x => x == Const.roleDictionary.SUPER_ADMIN_WRITER);
    }

    public isUserSuperAdminReader(): boolean {
        return this.getLoggedUser().role.some(x => x == Const.roleDictionary.SUPER_ADMIN_READER);
    }

    public refreshAnimalCollection(lang: string) {
        let animalPromise: Promise<AnimalCollectionItem> = this.animalService.getAnimalCollectionItem(
            DateTools.getBigEndianDateTimeString(this.sharedData.getSelectedDate(), "/", null, null), lang);
        let self = this;
        animalPromise.then(
            function (_animalCollectionItem: AnimalCollectionItem) {
                self.sharedData.setAnimalCollection(_animalCollectionItem);
            }
        );
    }

    public refreshCalendarEvents(date: Date, refreshEvents: Function, refreshCallback: Function): void {
        //get calendar events from DB        
        let eventsPromise: Promise<CalendarItem> = this.calendarEventService.getEvents(date, this.translate.currentLang);
        let self = this;
        eventsPromise.then(
            function (events: CalendarItem) {
                //patch
                for (let event of events.eventsData) {
                    event.color = event.section.color;
                }
                ////////////////////
                self.sharedData.setCalendarItem(<CalendarItem>events);
                if (refreshEvents) {
                    //to referesh calendar view
                    refreshEvents(events.eventsData);
                }
                if (refreshCallback) {
                    refreshCallback();
                }
            }
        );
    }

    public refreshVisitorEstimateData(lang: string, date: Date, _callback: Function): void {
        let visitorPromise: Promise<VisitorEstimateItem> = this.visitorService.getVisitorEstimateItem(date, lang);
        let self = this;
        visitorPromise.then(
            function (_visitorEstimateItem: VisitorEstimateItem) {
                if(_visitorEstimateItem != null)
                {                
                    for (let day of _visitorEstimateItem.days) {
                        //trick to convert to date
                        day.date = DateTools.getDateTimeFromBigEndianString(day.date.toString(), "-", null, null);
                    }
                    _callback(_visitorEstimateItem);
                }
            }
        );
    }

}
