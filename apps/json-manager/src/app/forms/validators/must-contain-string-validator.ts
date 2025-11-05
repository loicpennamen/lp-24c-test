import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MustContainStringValidator(searchStr: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !control.value.includes(searchStr)
      ? { mustContain: searchStr }
      : null;
  };
}
