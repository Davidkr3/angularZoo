import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DateTools } from '../utils/utils';
import { DatepickerLocale } from '../utils/const';
import { TranslateService } from 'ng2-translate';
import 'jqueryui'
import { ConstConfig } from "../config/const.config";
declare var $: any; //to use jquery

@Component({
    selector: 'date-selector',
    templateUrl: `view/html/partial-components/date-selector.component.html`,
    styleUrls: ['view/css/partial-components/date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {
    @Input() private initDate: Date;
    @Output() private setDateAction: EventEmitter<Date> = new EventEmitter<Date>();
    private initDateStringModel: string;
    @ViewChild("datepicker") private datepicker: ElementRef;

    constructor(protected translate: TranslateService) { }

    public ngOnInit() {
        this.initDatePicker();
        this.initDateStringModel = DateTools.getBigEndianDateTimeString(this.initDate, '-', null, null); //no time        
    }

    private initDatePicker() {
        //for general jquery datepicker
        $.datepicker.setDefaults(DatepickerLocale[this.translate.currentLang]);
        let self = this;
        //my own datepicker input element
        $(this.datepicker.nativeElement).datepicker({
            onSelect: function () {
                self.setDate();
            }
        });
    }

    //called from parent
    public setLocale(lang: string) {
        $.datepicker.setDefaults(DatepickerLocale[lang]);
        //refresh
        $(this.datepicker.nativeElement).datepicker();
    }

    private setDate() {
        let selectedDate: Date = $(this.datepicker.nativeElement).datepicker('getDate');
        this.setDateAction.emit(selectedDate);
    }

    private openDatePicker() {
        $(this.datepicker.nativeElement).datepicker("show");
    }

    private getDateInternationalized(): string {
        return DateTools.getInternationalizedDateTimeString(this.initDate, this.translate.currentLang, '/', null, null);
    }

}