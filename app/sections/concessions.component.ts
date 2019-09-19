import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Licensee } from '../models/concessions/licensee';
import { Concession } from '../models/concessions/concession';
import { LicenseeToSave } from '../models/concessions/licensee-to-save';
import { BaseSection } from './base-section';
import { ConcessionsService } from '../services/concessions.service';
import { TranslateService } from 'ng2-translate';
import { FormTemplateComponent } from '../partial-components/dynamic-form/form-template.component';
import { DateSelectorComponent } from '../partial-components/date-selector.component';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { Question } from '../models/dynamic-form/question';
import { Const } from '../utils/const';
import { DateTools } from '../utils/utils';
import { ConcessionsItem } from '../models/concessions/concessions-item';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/concessions.component.html`,
  styleUrls: ['view/css/sections/concessions.component.css']
})
export class ConcessionsComponent extends BaseSection {
  private selectedConcession: Concession;
  private showQuestions: boolean;
  //can't bind method at view (infinite loop issue)
  private emptyQuestionsAux: Question[];
  //modification until date
  private untilDate: Date;
  @ViewChild("global") private formTemplateGlobal: FormTemplateComponent;
  @ViewChildren("dateSelector") private dateSelectors: DateSelectorComponent[];

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData, private concessionsService: ConcessionsService, 
    protected sharedServices: SharedServices) {

    super(translate, sharedData, sharedServices);
    //each time we access to the view, context is setted
    this.sharedData.setContext(this);
    this.showQuestions = false;
    this.untilDate = this.sharedData.getSelectedDate();
  }

  public isUserAuthorized(): boolean {
    if (this.sharedServices.getLoggedUser()) {
      if (!this.sharedServices.isUserSuperAdminWriter()) {
        //if any concessions role
        for (let concRole in Const.roleDictionary.CONCESSIONS_MANAGER) {
          if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.CONCESSIONS_MANAGER[concRole])) {
            return true;
          }
        }
      }
      else {
        return true;
      }
    }
    else {
      //(GUEST IS NOT AN AUTHORIZED USER)
      return false;
    }
  }

  private openSelectedConcession(_concession: Concession): void {
    if (this.selectedConcession == null || _concession != this.selectedConcession) {
      this.setSelectedConcession(_concession);
    }
    else {
      this.setSelectedConcession(null);
    }
  }

  private setSelectedConcession(_concession: Concession) {
    this.selectedConcession = _concession;
  }

  private getSelectedLicensees(): Licensee[] {
    return this.selectedConcession.licensees.filter(x => x.selected == true);
  }

  private saveLicenseesMultipleData(): void {
    for (let licensee of this.getSelectedLicensees()) {
      //get from the copy in order to modify a copy before save
      licensee.questions = this.formTemplateGlobal.getFormFieldsTyped();
      //edit
      this.concessionsService.saveLicenseeInfo(true, this.getLicenseeToSave(licensee), this.translate.currentLang);
    }
  }

  private getLicenseeToSave(licensee: Licensee): LicenseeToSave {
    let l: LicenseeToSave = new LicenseeToSave();
    l.selectedDate = DateTools.getBigEndianDateTimeString(this.sharedData.getSelectedDate(), '/', null, null);
    l.untilDate = DateTools.getBigEndianDateTimeString(this.untilDate, '/', null, null);
    l.licensee = licensee.licensee;
    l.questions = licensee.questions;
    return l;
  }

  private setShowQuestions(): void {
    this.showQuestions = !this.showQuestions;
    //can't bind method at view (infinite loop issue)    
    //questions can change
    this.setEmptyQuestions();
  }

  //patch for getting empty questions
  private setEmptyQuestions(): void {
    //typing copy
    let licenseeAux: Licensee = <Licensee>(new Licensee(<Licensee>this.getSelectedLicensees()[0])).clone();
    for (let question of licenseeAux.questions) {
      question.answer = "";
    }
    this.emptyQuestionsAux = licenseeAux.questions;
  }

  private setUntilDate(_untilDate: Date): void {
    this.untilDate = _untilDate;
  }

  //overload
  protected refreshData(lang: string): void {
    let concessionsPromise: Promise<ConcessionsItem> = this.concessionsService.getConcessionsItem(
      DateTools.getBigEndianDateTimeString(this.sharedData.getSelectedDate(), "/", null, null), this.translate.currentLang);
    let self = this;
    concessionsPromise.then(
      function (_concessionsItem: ConcessionsItem) {
        self.sharedData.setConcessions(_concessionsItem);
        self.setSelectedConcession(null);    
        self.showQuestions = false;    
      }
    );
  }

  //for multi lang
  public onLocaleChanges(lang: string): void {
    //LANG NOT ALREADY CHANGED: TAKE PARAMETER ONE
    this.refreshData(lang);
    //TODO: modify when id available
    this.setSelectedConcession(null);
    //for each
    this.dateSelectors.forEach(x => x.setLocale(lang));
  }

}