import { AnimalInfo } from './animal-info';
import { BaseModel } from '../base/base-model';
import { DateTools } from '../../utils/utils';
import { ComboData } from '../base/combo-data';

export class CategoryData extends BaseModel {
    constructor() {
        super();
        this.animalInfo = [];
    }
    public category: number;
    public categoryName: string;
    public animalInfo: AnimalInfo[];
    public comboAnimals: ComboData[];

    public fromJSON(a: any) {
        Object.assign(this, <CategoryData>a);
        return this;
    }

}