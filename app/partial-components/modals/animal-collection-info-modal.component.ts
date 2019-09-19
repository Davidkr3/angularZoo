import {
  Component, Input, OnChanges, trigger,
  state, style, animate, transition,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { AnimalInfo } from '../../models/animal-collection/animal-info';
import { BaseModal } from './base-modal';
import { DateTools } from '../../utils/utils';
import { ComboData } from '../../models/base/combo-data';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'animal-collection-info-modal',
  templateUrl: 'view/html/partial-components/modals/animal-collection-info-modal.component.html',
  styleUrls: ['view/css/partial-components/modals/animal-collection-info-modal.component.css'],
  encapsulation: ViewEncapsulation.None //for css
})
export class AnimalCollectionInfoModalComponent extends BaseModal {
  @Input() selectedInfo: AnimalInfo; //input setted on click    
  @Input() private comboDesc: Array<ComboData>;
  @Input() private comboAnimal: Array<ComboData>;
  @Input() private authorized: boolean;
  private selectedInfoAux: AnimalInfo; //to preserve changes until OK click   
  private logicDatesErrmMsg = '';

  constructor(private translate: TranslateService) {
    super();
  }

  public getFormData(): AnimalInfo {
    //check
    if (this.validateForm()) {
      //patch
      this.selectedInfoAux.animal.id = this.comboAnimal.find(x => x.name == this.selectedInfoAux.animal.name).id;
      this.selectedInfoAux.description.id = this.comboDesc.find(x => x.name == this.selectedInfoAux.description.name).id;
      //close
      return this.selectedInfoAux;      
    }
    else {
      //to enable errors
      this.firstTime = false;
      return null;
    }
  }

  public validateForm(): boolean {
    //for submit
    //all conditions at the same time
    if (this.selectedInfoAux.description.name && this.selectedInfoAux.animal.name
      && this.selectedInfoAux.initTime && this.selectedInfoAux.endTime) {
      if (this.checkTimeLogic()) {
        return true;
      }
      else {
        this.logicDatesErrmMsg = this.translate.get('calendar.addEvent.error.logicDatesErrmMsg')['value'];
        return false;
      }
    }
    else {
      this.logicDatesErrmMsg = "";
      return false;
    }
  }

  private checkTimeLogic(): boolean {
    if (DateTools.getTimeFromString(this.selectedInfoAux.initTime).getTime() <
      DateTools.getTimeFromString(this.selectedInfoAux.endTime).getTime()) {
      return true;
    }
    return false;
  }

  //called from parent
  public resetForm(): void {
    //typing
    this.selectedInfoAux =
      <AnimalInfo>new AnimalInfo(<AnimalInfo>this.selectedInfo).clone();
    this.firstTime = true;
  }

}