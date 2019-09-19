import { Component, Input, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'file-modal',
    templateUrl: `view/html/partial-components/modals/file-modal.component.html`,
    styleUrls: ['view/css/partial-components/modals/file-modal.component.css'],
    encapsulation: ViewEncapsulation.None //for css
})
export class FileModalComponent implements OnInit {
    @Input() private file: string;
    @ViewChild("displayImage") private displayImage: ElementRef;

    constructor(private translate: TranslateService) {
    }

    public ngOnInit(): void {
        //DISPLAY IMAGE        
        if (this.file) {
            this.displayImage.nativeElement.src = this.file;
        }
    }

}