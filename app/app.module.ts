import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarComponent } from './partial-components/calendar.component';
import { CalendarEventModalComponent } from './partial-components/modals/calendar-event-modal.component';
import { BaseModalComponent } from './partial-components/modals/base-modal.component';
import { DateSelectorComponent } from './partial-components/date-selector.component';
import { AnimalCollectionCategoryComponent } from './partial-components/animal-collection-category.component';
import { AppRoutingModule } from './config/app-routing.module';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { AnimalCollectionComponent } from './sections/animal-collection.component';
import { EventsComponent } from './sections/events.component';
import { ConcessionsComponent } from './sections/concessions.component';
import { VisitorEstimateComponent } from './sections/visitor-estimate.component';
import { SpecialOfferComponent } from './sections/special-offer.component';
import { AccessAuthComponent } from './sections/access-auth.component';
import { MainComponent } from './sections/main.component';
import { LoginComponent } from './sections/login.component';
import { FormTemplateComponent } from './partial-components/dynamic-form/form-template.component';
import { FormsModule } from '@angular/forms';
import { SectionsSharedData } from './models/base/sections-shared-data';
import { AnimalCollectionInfoModalComponent } from './partial-components/modals/animal-collection-info-modal.component';
import { OfferModalComponent } from './partial-components/modals/special-offer-modal.component';
import { FileModalComponent } from './partial-components/modals/file-modal.component';
import { AccessAuthModalComponent } from './partial-components/modals/access-auth-modal.component';
import { AnimalCollectionService } from './services/animal-collection.service';
import { UserService } from './services/user.service';
import { CalendarEventService } from './services/calendar-event.service';
import { ConcessionsService } from './services/concessions.service';
import { VisitorEstimateService } from './services/visitor-estimate.service';
import { DailyInfoModalComponent } from './partial-components/modals/daily-info-modal.component';
import { ConcessionLicenseeComponent } from './partial-components/concession-licensee.component';
import { OfferItemComponent } from './partial-components/offer-item.component';
import { SharedServices } from './models/base/shared-services';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule, //needed       
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'view/i18n', '.json'), //using base href
      deps: [Http]
    })
  ],
  declarations: [AppComponent, AnimalCollectionComponent, EventsComponent, ConcessionsComponent,
    VisitorEstimateComponent, SpecialOfferComponent, AccessAuthComponent, LoginComponent, CalendarEventModalComponent,
    CalendarComponent, FileModalComponent, AccessAuthModalComponent,
    MainComponent, AnimalCollectionCategoryComponent, FormTemplateComponent, OfferModalComponent,
    AnimalCollectionInfoModalComponent, BaseModalComponent, DateSelectorComponent,
    DailyInfoModalComponent, ConcessionLicenseeComponent, OfferItemComponent], //components to use in other components
  //providers for injection
  providers: [SectionsSharedData, SharedServices, AnimalCollectionService, UserService, CalendarEventService, ConcessionsService, VisitorEstimateService], //services
  bootstrap: [AppComponent] //initial component
})
export class AppModule { }