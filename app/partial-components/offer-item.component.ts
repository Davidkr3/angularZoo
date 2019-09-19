import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Offer } from '../models/special-offer/offer';
import { SpecialOfferSection } from '../models/special-offer/special-offer-section';
import { TranslateService } from 'ng2-translate';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { DateTools } from '../utils/utils';
import { BaseModalComponent } from '../partial-components/modals/base-modal.component';
import { Const } from '../utils/const';

@Component({
    selector: 'offer-item',
    templateUrl: `view/html/partial-components/offer-item.component.html`,
    styleUrls: ['view/css/partial-components/offer-item.component.css']
})
export class OfferItemComponent implements OnInit {
    @Input() private selectedOfferSection: SpecialOfferSection;
    @Input() private sharedData: SectionsSharedData;
    @Input() private offer: Offer;
    @Input() private authorized: boolean;
    @ViewChild('offerInfoModal') private offerInfoModal: BaseModalComponent;
    @ViewChild('fileModal') private fileModal: BaseModalComponent;
    private showData: boolean;

    constructor(protected translate: TranslateService) { }

    public ngOnInit(): void {

    }

    private setShowData(): void {
        this.showData = !this.showData;
    }

    private saveOfferData(_offer: Offer): void {
        //TODO: save at database                     
    }

    private deleteOffer(_offer: Offer): void {
        let index: number = this.selectedOfferSection.offers
            .indexOf(this.selectedOfferSection.offers.find(x => x.offer == _offer.offer));
        this.selectedOfferSection.offers.splice(index, 1);
        //TODO: remove from DB
    }

    private clickEdit(_offer: Offer, event: MouseEvent): void {
        this.offerInfoModal.setVisible(true);
    }

    private editOffer(_offer: Offer): void {
        //TODO: save at db
        //called from modal
        this.offer = _offer;
    }

    private openFile(file: string): void {
        this.fileModal.setVisible(true);
    }

    //for view
    protected getDateInternacionalized(date: Date): string {
        return DateTools.getInternationalizedDateTimeString(
            date, this.translate.currentLang, '/', null, null); //no time
    }

    private hasOfferExpired(): string {
        if (this.offer.expiration) {
            if (this.offer.expiration.getTime() < new Date().getTime()) {
                return Const.colors.colorAlert;
            }
            else {
                return Const.colors.colorOK;
            }
        }
        else {
            return Const.colors.colorOK;
        }
    }

}