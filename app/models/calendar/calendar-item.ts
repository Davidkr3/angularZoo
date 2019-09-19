import { CalendarEvent } from './calendar-event';
import { ComboData } from '../base/combo-data';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';


export class CalendarItem extends BaseModel {
    constructor(_date: Date = undefined) {
        super();
    }

    public comboSections: ComboData[];
    public eventsData: CalendarEvent[];

    public fromJSON(c: any): CalendarItem {
        Object.assign(this, <CalendarItem>c);
        return this;
    }
}