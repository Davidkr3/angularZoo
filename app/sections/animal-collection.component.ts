import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user/user';
import { BaseSection } from './base-section';
import { AnimalCollectionItem } from '../models/animal-collection/animal-collection-item';
import { TranslateService } from 'ng2-translate';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { Const } from '../utils/const';
import { DateSelectorComponent } from '../partial-components/date-selector.component';
import { DateTools } from '../utils/utils';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/animal-collection.component.html`,
  styleUrls: ['view/css/sections/animal-collection.component.css']
})
export class AnimalCollectionComponent extends BaseSection {
  @ViewChild(DateSelectorComponent) private dateSelector: DateSelectorComponent;

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData, protected sharedServices: SharedServices) {
    //data refreshed at constructor
    super(translate, sharedData, sharedServices);
    //each time we access to the view, context is setted
    this.sharedData.setContext(this);
  }

  //overload
  protected refreshData(lang: string): void {
    this.sharedServices.refreshAnimalCollection(lang);
  }

  //for multi lang
  public onLocaleChanges(lang: string): void {
    //LANG NOT ALREADY CHANGED: TAKE PARAMETER ONE
    this.refreshData(lang);
    this.dateSelector.setLocale(lang);
  }

}
