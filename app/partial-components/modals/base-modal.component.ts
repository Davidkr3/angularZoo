import {
    Component, Input, Output, OnChanges, EventEmitter, ViewChild
} from '@angular/core';
import { FormTemplateComponent } from '../dynamic-form/form-template.component';
import { CalendarEvent } from '../../models/calendar/calendar-event';
import { CalendarEventModalComponent } from './calendar-event-modal.component';
import { AnimalCollectionInfoModalComponent } from './animal-collection-info-modal.component';
import { OfferModalComponent } from './special-offer-modal.component';
import { DailyInfoModalComponent } from './daily-info-modal.component';
import { AccessAuthModalComponent } from './access-auth-modal.component';

@Component({
    selector: 'base-modal',
    templateUrl: 'view/html/partial-components/modals/base-modal.component.html',
    styleUrls: ['view/css/partial-components/modals/base-modal.component.css']    
})
export class BaseModalComponent {
    private visibleInput: boolean; //input setted on click  
    @Output() parentAction: EventEmitter<any> = new EventEmitter<any>();
    @Output() parentAction2: EventEmitter<any> = new EventEmitter<any>();
    @Input() private type: string;
    @Input() private title: string;
    @Input() private buttonParams: Object;
    @Input() private buttonParams2: Object;
    @Input() private params: Object;
    @Input() private authorized: boolean;
    //needed for getFormData
    @ViewChild(CalendarEventModalComponent) private addEventModal: CalendarEventModalComponent;
    @ViewChild(CalendarEventModalComponent) private eventInfoModal: CalendarEventModalComponent;
    @ViewChild(AnimalCollectionInfoModalComponent) private addColInfoModal: AnimalCollectionInfoModalComponent;
    @ViewChild(AnimalCollectionInfoModalComponent) private colInfoModal: AnimalCollectionInfoModalComponent;
    @ViewChild(OfferModalComponent) private addOfferModal: OfferModalComponent;
    @ViewChild(OfferModalComponent) private offerInfoModal: OfferModalComponent;
    @ViewChild(DailyInfoModalComponent) private addDailyInfoModal: OfferModalComponent;
    @ViewChild(DailyInfoModalComponent) private dailyInfoModal: OfferModalComponent;
    @ViewChild(AccessAuthModalComponent) private accessAuthModal: OfferModalComponent;

    constructor() { }

    public setVisible(_visible: boolean) {
        this.visibleInput = _visible;
        //body scroll
        if (_visible) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
    }

    //modal action (can be none)
    //output receptor
    private action(): void {
        //submit
        let formData: any = this[this.type].getFormData();
        if (formData) {
            this.parentAction.emit(formData);
            this.setVisible(false);
        }
    }

    private secondaryAction(): void {
        //delete
        this.parentAction2.emit(this[this.type].getFormData());
        this.setVisible(false);
    }

}