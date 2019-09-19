import { Component, ViewChild } from '@angular/core';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { AccessAuthItem } from '../models/access-auth/access-auth-item'
import { AccessData } from '../models/access-auth/access-data'
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { BaseModalComponent } from '../partial-components/modals/base-modal.component';
import { Const } from '../utils/const';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/access-auth.component.html`,
  styleUrls: ['view/css/sections/access-auth.component.css']
})
export class AccessAuthComponent extends BaseSection {
  private data: Object =
  {
    comboDepartments: [{ id: 1, name: "OTZ" }, { id: 2, name: "Comercial Marketing" }, { id: 3, name: "Producción Soporte" }],
    comboClaimers: [{ id: 1, name: "Eulalia Bohigas" }, { id: 2, name: "Anna Pérez" }, { id: 3, name: "Hector López" }],
    accessData:
    [
      {
        accessData: 1,
        department: "Comercial Marketing",
        claimer: "Eulalia Bohigas",
        accessDate: new Date(),
        area: "ZONA ORANGUTANS",
        company: "MOIX, SERVEIS I OBRES, S.L.",
        driverName: "JAUME VIDAL VALLES",
        carRegistration: "B-1266-WY  (FURGONETA FIAT SCUDO)",
        material: "SUBSTRACTE DE TERRA",
        observations: "PENDENT DE CONFIRMAR PERSONAL QUE PORTARÀ UN DE LES SEGÜENTS MATRÍCULES: 3488-DWK E-7696-BFJ E-8149-BDT 6598-HDT",
        authorized: "true"
      },
      {
        accessData: 2,
        department: "Comercial Marketing",
        claimer: "Eulalia Bohigas",
        accessDate: new Date(),
        area: "ZONA ORANGUTANS",
        company: "EQT CONSULTING",
        driverName: "JAUME VIDAL VALLES",
        carRegistration: "B-1266-WY  (FURGONETA FIAT SCUDO)",
        material: "SUBSTRACTE DE TERRA",
        observations: "PENDENT DE CONFIRMAR PERSONAL QUE PORTARÀ UN DE LES SEGÜENTS MATRÍCULES: 3488-DWK E-7696-BFJ E-8149-BDT 6598-HDT",
        authorized: "false"
      },
      {
        accessData: 3,
        department: "Comercial Marketing",
        claimer: "Eulalia Bohigas",
        accessDate: new Date(),
        area: "ZONA ORANGUTANS",
        company: "GIRAFES & CO S.L.",
        driverName: "JAUME VIDAL VALLES",
        carRegistration: "B-1266-WY  (FURGONETA FIAT SCUDO)",
        material: "SUBSTRACTE DE TERRA",
        observations: "PENDENT DE CONFIRMAR PERSONAL QUE PORTARÀ UN DE LES SEGÜENTS MATRÍCULES: 3488-DWK E-7696-BFJ E-8149-BDT 6598-HDT",
        authorized: "pending"
      }
    ]
  };
  private selectedAccessData: AccessData;
  @ViewChild('accessAuthModal') private accessAuthModal: BaseModalComponent;
  @ViewChild('addAccessAuthModal') private addAccessAuthModal: BaseModalComponent;

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData, protected sharedServices: SharedServices) {
    super(translate, sharedData, sharedServices);
    this.sharedData.setContext(this);
    this.selectedAccessData = new AccessData();
  }

  //for view show
  private setSelectedAccessData(_selectedAccessData: AccessData): void {
    if (this.selectedAccessData != _selectedAccessData) {
      this.selectedAccessData = _selectedAccessData;
    }
    else {
      this.selectedAccessData = new AccessData();
    }
  }

  private clickEdit(_accessData: AccessData): void {
    this.accessAuthModal.setVisible(true);
    //for input
    this.selectedAccessData = _accessData;
  }

  private onAddClick(): void {
    this.selectedAccessData = new AccessData();
    this.addAccessAuthModal.setVisible(true);
  }

  private editAccess(_accessData: AccessData): void {
    //TODO: save at db
    let index: number = this.sharedData.getAccessAuthItem().accessData
      .indexOf(this.sharedData.getAccessAuthItem().accessData.find(x => x.accessData == _accessData.accessData));
    this.sharedData.getAccessAuthItem().accessData[index] = _accessData;
    this.selectedAccessData = _accessData;
  }

  private addAccess(_accessData: AccessData) {
    /////
    _accessData.accessData = 11;
    /////  
    this.sharedData.getAccessAuthItem().accessData.push(_accessData);
    this.setColorStatus();
    //TODO:SAVE AT BE
  }

  private deleteAccess(_accessData: AccessData): void {
    let index: number = this.sharedData.getAccessAuthItem().accessData
      .indexOf(this.sharedData.getAccessAuthItem().accessData.find(x => x.accessData == _accessData.accessData));
    this.sharedData.getAccessAuthItem().accessData.splice(index, 1);
    //TODO: remove from DB
  }

  private setAuthorization(_authorization: string): void {
    this.selectedAccessData.authorized = _authorization;
    this.setColorStatus();
    //save at db
    this.editAccess(this.selectedAccessData);
  }

  public isUserAuthorized(): boolean {
    if (this.sharedServices.getLoggedUser()) {
      if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.ACCESS_AUTH_MANAGER)
        || this.sharedServices.isUserSuperAdminWriter()) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  private setColorStatus(): void {
    for (let access of this.sharedData.getAccessAuthItem().accessData)
      switch (access.authorized) {
        case "true":
          {
            access.color = Const.colors.colorOK
            break;
          }
        case "false":
          {
            access.color = Const.colors.colorAlert
            break;
          }
        case "pending":
          {
            access.color = Const.colors.colorPending
            break;
          }
        default:
          {
            access.color = Const.colors.colorPending
            break;
          }
      }
  }

  //overload
  protected refreshData(): void {
    //TODO: get from DB      
    this.sharedData.setAccessAuthItem(<AccessAuthItem>this.sharedData.getAccessAuthItem().fromJSON(this.data));
    //TODO: in callback
    this.setColorStatus();
    ////   

    // let concessionsPromise: Promise<ConcessionsItem> = this.concessionsService.getConcessionsItem(
    //   DateTools.getBigEndianDateTimeString(this.sharedData.getSelectedDate(), "/", null, null), this.translate.currentLang);
    // let self = this;
    // concessionsPromise.then(
    //   function (_concessionsItem: ConcessionsItem) {
    //     self.sharedData.setConcessions(_concessionsItem);
    //   }
    // );
  }
}