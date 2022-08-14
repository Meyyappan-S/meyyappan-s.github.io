import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const dateStr = control.value;
        const DATE_REGEX = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        const invalidObj = { 'date': true };

        if (!DATE_REGEX.test(dateStr)) {
            return invalidObj;
        }
        const monthLengthArr = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        const dateArr = dateStr.split('/');
        const month = parseInt(dateArr[0], 10);
        const day = parseInt(dateArr[1], 10);
        const year = parseInt(dateArr[2], 10);

        const now = new Date();

        if(year !== now.getFullYear() || month < (now.getMonth()+1) || month > (now.getMonth()+3))
            return invalidObj;

        if(year%400 == 0 || (year%100 !== 0 && year%4 === 0))
            monthLengthArr[1] = 29;

        if (!(day > 0 && day <= monthLengthArr[month - 1])) {
            return invalidObj;
        };

        const date = new Date(dateStr);

        if (date < now) {
            return invalidObj;
        }

        return null;
    }
}
