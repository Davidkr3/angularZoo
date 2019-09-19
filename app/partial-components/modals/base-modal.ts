import { OnInit } from '@angular/core';

export abstract class BaseModal implements OnInit {
    protected firstTime: boolean;

    constructor() { }

    public ngOnInit() {
        //resets input modals forms
        this.resetForm();
    }

    protected abstract validateForm(): boolean;

    protected abstract resetForm(): void;

    protected abstract getFormData(): Object;

}