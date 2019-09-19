import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Question } from '../../models/dynamic-form/question';

@Component({
  selector: 'form-template',
  templateUrl: `view/html/partial-components/dynamic-form/form-template.component.html`,
  styleUrls: ['view/css/partial-components/dynamic-form/form-template.component.css']
})

export class FormTemplateComponent implements OnChanges {
  @Input() private formFields: Question[];
  @Input() private authorized: boolean;
  @Input() private id: number; //to identify when many
  private formFieldsAux: Question[]; //make a copy for edition
  private firstTime: boolean;

  constructor() {
    this.firstTime = true;
    this.formFieldsAux = [];
  } //no formFieldsInput here

  public ngOnChanges() { //when formFields input changes
    this.formFieldsAux = []; //refresh
    for (let i: number = 0; i < this.formFields.length; i++) {
      //restoring object typing and copying
      let formField = new Question();
      formField = Object.assign(formField, <Question>this.formFields[i]);
      this.formFieldsAux.push(formField);
    }
  }

  public getId(): number {
    return this.id;
  }

  public getFormFieldsTyped(): Question[] {
    return this.formFieldsAux;
  }

  private isFilled(answer: string): boolean {
    if (answer) {
      return true;
    }
    return false;
  }

  public validateForm(): boolean {
    //check all answers
    for (let field of this.formFieldsAux) {
      if (!field.answer) {
        return false;
      }
    }
    return true;
  }

  public disableFirstTime() {
    this.firstTime = false;
  }

}