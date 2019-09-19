import { DateTools } from '../../utils/utils';
import { BaseModel } from '../base/base-model';

export class DailyInfo extends BaseModel {
    constructor(_dailyInfo: DailyInfo = null) {
        super();
        if (_dailyInfo) {
            this.date = _dailyInfo.date;
            this.eventuality = _dailyInfo.eventuality;
            this.visitorEstimate = _dailyInfo.visitorEstimate;
            this.visitorReal = _dailyInfo.visitorReal;
            this.dailyInfo = _dailyInfo.dailyInfo;
        }
    }

    public dailyInfo: number;
    public date: Date;
    public eventuality: number; //combo
    public visitorEstimate: number;
    public visitorReal: number;

    public fromJSON(i: any): DailyInfo {
        Object.assign(this, <DailyInfo>i);
        return this;
    }
}