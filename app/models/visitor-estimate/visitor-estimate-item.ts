import { DateTools } from '../../utils/utils';
import { DailyInfo } from './dailyInfo';
import { ComboData } from '../base/combo-data';
import { BaseModel } from '../base/base-model';

export class VisitorEstimateItem extends BaseModel {
    constructor() {
        super();
    }

    comboEventualities: ComboData[];
    days: DailyInfo[];

    public fromJSON(i: any): VisitorEstimateItem {
        Object.assign(this, <VisitorEstimateItem>i);
        return this;
    }
}