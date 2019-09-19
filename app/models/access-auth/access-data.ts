import { ComboData } from '../base/combo-data';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';


export class AccessData extends BaseModel {
    constructor(_accessData: AccessData = null) {
        super();
        if (_accessData) {
            this.accessData = _accessData.accessData;
            this.department = _accessData.department;
            this.claimer = _accessData.claimer;
            this.accessDate = _accessData.accessDate;
            this.area = _accessData.area;
            this.company = _accessData.company;
            this.driverName = _accessData.driverName;
            this.carRegistration = _accessData.carRegistration;
            this.material = _accessData.material;
            this.observations = _accessData.observations;
            this.authorized = _accessData.authorized;
            this.color = _accessData.color;
        }
        else
        {
            //default
            this.authorized = "pending";
        }
    }
    public accessData: number;
    public department: string;
    public claimer: string;
    public accessDate: Date;
    public area: string;
    public company: string;
    public driverName: string;
    public carRegistration: string;
    public material: string;
    public observations: string;
    public authorized: string;
    public color: string;

    public fromJSON(a: any): AccessData {
        Object.assign(this, <AccessData>a);
        return this;
    }
}