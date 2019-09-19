import { ComboData } from '../base/combo-data';
import { AccessData } from './access-data';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';


export class AccessAuthItem extends BaseModel {
    constructor(_accessAuthItem: AccessAuthItem = null) {
        super();
        if (_accessAuthItem) {
            this.comboDepartments = _accessAuthItem.comboDepartments;
            this.comboClaimers = _accessAuthItem.comboClaimers;
            this.accessData = _accessAuthItem.accessData;
        }
    }
    public comboDepartments: ComboData[];
    public comboClaimers: ComboData[];
    public accessData: AccessData[];

    public fromJSON(a: any): AccessAuthItem {
        Object.assign(this, <AccessAuthItem>a);
        return this;
    }
}