import { Component, ViewChild } from '@angular/core';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { SpecialOffersItem } from '../models/special-offer/special-offers-item';
import { SpecialOfferSection } from '../models/special-offer/special-offer-section';
import { Offer } from '../models/special-offer/offer';
import { Const } from '../utils/const';
import { DateTools } from '../utils/utils';
import { BaseModalComponent } from '../partial-components/modals/base-modal.component';
import { SharedServices } from '../models/base/shared-services';

@Component({
  templateUrl: `view/html/sections/special-offer.component.html`,
  styleUrls: ['view/css/sections/special-offer.component.css']
})
export class SpecialOfferComponent extends BaseSection {
  //input  
  private selectedOfferSection: SpecialOfferSection;
  @ViewChild('addOfferModal') private addOfferModal: BaseModalComponent;
  //input
  private newOffer: Offer;

  private data: Object =
  {
    offerSections:
    [
      {
        type: "90%",
        offers:
        [
          {
            offer: 1,
            code: 123,
            name: "carnet jove",
            price: 5,
            expiration: new Date(new Date().setDate(new Date().getDate() + 1)),
            noValid: "Abril i día de Sant Valentí",
            observations: "test test",
            file: ""
          },
          {
            offer: 2,
            code: 456,
            name: "TR3SC",
            price: 20,
            expiration: new Date(),
            noValid: "29/02",
            observations: "test2 test2",
            file: ""
          }
        ]
      },
      {
        type: "Gratis",
        offers:
        [
          {
            offer: 3,
            code: 789,
            name: "SPLAU TARGETA VIP",
            price: 30,
            expiration: new Date(),
            noValid: "dilluns, dimarts, dimecres, dijous, divendres, dissabte, diumenge",
            observations: "test3 test3",
            file: ""
          },
          {
            offer: 4,
            code: 101,
            name: "JoTMB (socis del Club TMB)",
            price: 90,
            expiration: new Date(),
            noValid: "22/03/2017 i diumenges",
            observations: "test4 test4",
            file: ""
          }
        ]
      }
    ]
  }

  constructor(protected translate: TranslateService, protected sharedData: SectionsSharedData, protected sharedServices:SharedServices) {
    super(translate, sharedData, sharedServices);
    this.sharedData.setContext(this);
  }

  private setSelectedOfferSection(_selectedOfferSection: SpecialOfferSection): void {
    if (this.selectedOfferSection) {
      if (this.selectedOfferSection != _selectedOfferSection) {
        this.selectedOfferSection = _selectedOfferSection;
      }
      else {
        this.selectedOfferSection = null;
      }
    }
    else {
      this.selectedOfferSection = _selectedOfferSection;
    }
  }

  public isUserAuthorized(): boolean {
    if (this.sharedServices.getLoggedUser()) {
      if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.SPECIAL_OFFER_MANAGER)
        || this.sharedServices.isUserSuperAdminWriter()) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  private onAddClick(): void {
    this.newOffer = new Offer();
    this.addOfferModal.setVisible(true);
  }

  private addOffer(_offer: Offer): void {
    /////
    _offer.offer = 11;
    /////  
    this.selectedOfferSection.offers.push(_offer);
    //TODO:SAVE AT BE

  }

  //overload
  protected refreshData(): void {
    //TODO: get from DB      
    this.sharedData.setSpecialOffers(<SpecialOffersItem>this.sharedData.getSpecialOffers().fromJSON(this.data));

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