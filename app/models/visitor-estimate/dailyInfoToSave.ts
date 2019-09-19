import { DateTools } from '../../utils/utils';
import { BaseModel } from '../base/base-model';
import { DailyInfo } from './dailyInfo';

export class DailyInfoToSave extends BaseModel {
    constructor(_dailyInfo: DailyInfo = null) {
        super();
        if (_dailyInfo) {
            this.date = DateTools.getBigEndianDateTimeString(_dailyInfo.date, "-",null,null);
            this.eventuality = _dailyInfo.eventuality;
            this.visitorEstimate = _dailyInfo.visitorEstimate;
            this.visitorReal = _dailyInfo.visitorReal;
            this.dailyInfo = _dailyInfo.dailyInfo;
        }
    }

    public dailyInfo: number;
    public date: string;
    public eventuality: number; //combo
    public visitorEstimate: number;
    public visitorReal: number;

    public fromJSON(i: any): DailyInfoToSave {
        Object.assign(this, <DailyInfoToSave>i);
        return this;
    }
}