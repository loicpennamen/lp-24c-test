import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.sass',
})
export class ErrorMessage {
  @Input({ required: true }) form: AbstractControl | null = null;
}
