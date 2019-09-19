import { CategoryData } from './category-data';
import { ComboData } from '../base/combo-data';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';


export class AnimalCollectionItem extends BaseModel {
    constructor(_date: Date = undefined) {
        super();      
    }
    public comboDescription: ComboData[];
    public categoriesData: CategoryData[];

    public fromJSON(a: any): AnimalCollectionItem {
        Object.assign(this, <AnimalCollectionItem>a);
        return this;
    }
}