import { BaseModel } from '../base/base-model';
import { ComboData } from '../base/combo-data';

export class AnimalInfo extends BaseModel {
    constructor(_animalInfo: AnimalInfo = null) {
        super();
        if (_animalInfo) {
            this.animalInfo = _animalInfo.animalInfo;
            this.description = _animalInfo.description;
            this.animal = _animalInfo.animal;
            this.initTime = _animalInfo.initTime;
            this.endTime = _animalInfo.endTime;
        }
        else
        {
            this.description = new ComboData();
            this.animal = new ComboData();
        }
    }
    public animalInfo: number;
    public description: ComboData;
    public animal: ComboData;
    public initTime: string;
    public endTime: string;
}   