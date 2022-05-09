import { ValidatorFn, AbstractControl,FormGroup } from '@angular/forms';
import { luhnCheck } from '../helpers/luhn.helper';

export function luhnValidator(controlName: string) {
   
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    const isValid = luhnCheck(control.value);
    if (
        control.errors &&
        !control.errors['luhnValidator']
      ) {
        return;
      }
    if (isValid) {
        control.setErrors(null);
      } else {
        control.setErrors({ luhnValidator: true });
      }
  };
}
