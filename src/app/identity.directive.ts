import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const identityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const name = control.get('idProof').value;
    const idProofValue = control.get('idProofValue').value;
    const invalidObj = { identity: true };

    if (name === 'Aadhar') {
        const AADHAR_REGEX = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/);
        return !AADHAR_REGEX.test(idProofValue) ? invalidObj : null;
    } else if (name === 'Pan') {
        const PAN_REGEX = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
        console.log(PAN_REGEX.test(idProofValue));
        return !PAN_REGEX.test(idProofValue) ? invalidObj : null;
    }

    return invalidObj;
  };
