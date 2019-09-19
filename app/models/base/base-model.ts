export abstract class BaseModel extends Object {    

    private static _clone_date(date: Date): Date {
        return new Date(date.getTime());
    }

    private static _clone_array(array: Array<any>): Array<any> {
        let new_array: Array<any> = [];
        for (let value of array) {
            new_array.push(this._clone(value));
        }

        return new_array;
    }

    private static _clone_object(obj: Object): Object {
        let keys = Object.getOwnPropertyNames(obj);
        let new_object = <Object>Object.create(obj);

        for (let key of keys) {
            new_object[key] = BaseModel._clone(obj[key]);
        }

        return new_object;
    }

    private static _clone(value: any): any {
        // Handle the 3 simple types, and null or undefined
        if (!value || typeof value !== "object")
            return value;
        //date    
        if (value instanceof Date) {
            return BaseModel._clone_date(value);
        }
        /* Handle Array
         * Note: Array is also an Object so must be before object checking.
         */
        if (value instanceof Array) {
            return BaseModel._clone_array(value);
        }

        // Handle Object
        if (value instanceof Object) {
            return BaseModel._clone_object(value);
        }

        throw Error("Unknown type of object.");
    }

    public clone(): BaseModel {
        return <BaseModel>BaseModel._clone_object(<Object>this);
    }
    /////////////////////////////////////////////////////////////////////
    private static _compareArray(arr1: Array<any>, arr2: Array<any>): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i: number = 0; i < arr1.length; i++) {
            if (!this._compare(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    }
    /*     
    private static _compareMoment(mom1: moment.Moment, mom2: moment.Moment): boolean {
         return mom1.diff(mom2) === 0; //no difference between moments
     }

     */

    private static _compareObject(obj1: Object, obj2: Object): boolean {
        let keys = Object.getOwnPropertyNames(obj1);
        for (let key of keys) {
            if (!BaseModel._compare(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }

    private static _compare(value1: any, value2: any): boolean {
        // Handle the 3 simple types, and null or undefined
        if (!value1 || typeof value1 !== "object" || !value2)
            return value1 === value2;

        /*  if (moment.isMoment(value1)) {
              return BaseModel._compareMoment(value1, value2);
          }*/

        /* Handle Array
         * Note: Array is also an Object so must be before object checking.
         */
        if (value1 instanceof Array) {
            return BaseModel._compareArray(value1, value2);
        }

        // Handle Object
        if (value1 instanceof Object) {
            return BaseModel._compareObject(value1, value2);
        }

        throw Error("Unknown type of object.");
    }

    public isEqual(compareObj: Object): boolean {
        return <boolean>BaseModel._compareObject(<Object>this, compareObj);
    }

    /////////////////////////////////////////////////////////////
    public arrayObjectIndexOf(items: BaseModel[], itemToSearch: BaseModel): number {
        let index: number = -1;
        for (let i: number = 0; i < items.length; i++) {
            if (items[i].isEqual(itemToSearch)) {
                index = i;
                break;
            }
        }
        return index;
    }
    /////////////////////////////////////////////////////////////////////     

}