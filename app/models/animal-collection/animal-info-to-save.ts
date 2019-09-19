import { BaseModel } from '../base/base-model';
import { AnimalInfo } from './animal-info';
import { DateTools } from '../../utils/utils';

export class AnimalInfoToSave extends BaseModel {
    constructor(_animalInfo: AnimalInfo = null, _selectedDate: Date = null, _category: number = null) {
        super();
        if (_animalInfo) {
            this.selectedDate = DateTools.getBigEndianDateTimeString(_selectedDate, "/", null, null);;
            this.category = _category;
            this.description = _animalInfo.description.id;
            this.animal = _animalInfo.animal.id;
            this.initTime = _animalInfo.initTime;
            this.endTime = _animalInfo.endTime;
        }
    }
    public selectedDate: string;
    public category: number;
    public description: number;
    public animal: number;
    public initTime: string;
    public endTime: string;
}   