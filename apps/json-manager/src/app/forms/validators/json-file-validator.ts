import { AbstractControl, ValidationErrors } from '@angular/forms';

export function jsonFileExtensionValidator(
  control: AbstractControl
): ValidationErrors | null {
  const file: File | null = control.value as File | null;
  if (!file) {
    return null;
  }
  return file.name.toLowerCase().endsWith('.json')
    ? null
    : { jsonFileExtensionValidator: { requiredExtension: '.json' } };
}
