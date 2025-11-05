import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MustNotContainStringValidator(searchStr: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.includes(searchStr)
      ? { mustNotContain: searchStr }
      : null;
  };
}
