import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CategoryData } from '../models/animal-collection/category-data';
import { ComboData } from '../models/base/combo-data';
import { Const } from '../utils/const';
import { DateTools } from '../utils/utils';
import { WebStorage } from '../utils/web-storage';
import { TranslateService } from 'ng2-translate';
import { BaseModalComponent } from './modals/base-modal.component';
import { AnimalInfo } from '../models/animal-collection/animal-info';
import { AnimalInfoToSave } from '../models/animal-collection/animal-info-to-save';
import { AnimalCollectionService } from '../services/animal-collection.service';
import { BaseReturn } from '../models/base/base-return';
import { SharedServices } from '../models/base/shared-services';


@Component({
    selector: 'collection-category',
    templateUrl: `view/html/partial-components/animal-collection-category.component.html`,
    styleUrls: ['view/css/partial-components/animal-collection-category.component.css']
})
export class AnimalCollectionCategoryComponent {
    @Input() private categoryData: CategoryData;
    @Input() private selectedDate: Date;
    @Input() private sharedServices: SharedServices;
    @Input() private comboDesc: Array<ComboData>;
    @ViewChild("addColInfoModal") private addColInfoModal: BaseModalComponent;
    @ViewChild("colInfoModal") private colInfoModal: BaseModalComponent;
    private selectedInfo: AnimalInfo;
    private modalTitle: string;

    constructor(private translate: TranslateService, private animalService: AnimalCollectionService) { }

    private onInfoClick(info: AnimalInfo): void {
        this.modalTitle = this.translate.get('collection.animalInfoModal.edit')['value'];
        this.colInfoModal.setVisible(true);
        //input
        this.selectedInfo = info;
    }

    private saveAnimalInfo(_animalInfo: AnimalInfo): void {
        let animalSave: AnimalInfoToSave =
            new AnimalInfoToSave(_animalInfo, this.selectedDate, this.categoryData.category);
        //edit: PUT
        if (_animalInfo.animalInfo) {
            //save at BE
            let savePromise = this.animalService.saveAnimalInfo(true, animalSave, this.translate.currentLang, _animalInfo.animalInfo);
            //view object
            let self = this;
            savePromise.then(
                function () {
                    let index: number = self.categoryData.animalInfo.indexOf(self.categoryData.animalInfo.find(x => x.animalInfo == _animalInfo.animalInfo));
                    self.categoryData.animalInfo[index] = _animalInfo;
                }
            );
        }
        //new: POST
        else {
            //save at BE
            let savePromise: Promise<BaseReturn> = this.animalService.saveAnimalInfo(false, animalSave, this.translate.currentLang);
            //GET ID BACK
            savePromise.then(
                function (returnData: BaseReturn) {
                    _animalInfo.animalInfo = returnData.id;
                }
            );
            //view object
            this.categoryData.animalInfo.push(_animalInfo);
        }
    }

    private deleteAnimalInfo(_animalInfo: AnimalInfo): void {
        let deletePromise = this.animalService.deleteAnimalInfo(_animalInfo.animalInfo, this.translate.currentLang);
        let self = this;
        deletePromise.then(
            function () {
                let index: number = self.categoryData.animalInfo
                    .indexOf(self.categoryData.animalInfo.find(x => x.animalInfo == _animalInfo.animalInfo));
                self.categoryData.animalInfo.splice(index, 1);
            }
        );
    }

    private onAddClick(): void {
        this.modalTitle = this.translate.get('collection.animalInfoModal.add')['value'];
        this.addColInfoModal.setVisible(true);
        //input
        this.selectedInfo = new AnimalInfo();
    }

    public isUserAuthorized(): boolean {
        //authorized by each category
        if (this.sharedServices.getLoggedUser()) {
            if (this.sharedServices.getLoggedUser().role.some(x => x == Const.roleDictionary.ANIMAL_MANAGER[this.categoryData.category])
                || this.sharedServices.isUserSuperAdminWriter()) {
                return true;
            }
        }
        else {
            //(GUEST IS NOT AN AUTHORIZED USER)
            return false;
        }
    }
}