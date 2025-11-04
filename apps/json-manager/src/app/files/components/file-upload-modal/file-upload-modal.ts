import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessage } from '../../../forms/components/error-message/error-message';
import { FilesFacade } from '../../files.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload-modal',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './file-upload-modal.html',
  styleUrl: './file-upload-modal.sass',
})
export class FileUploadModal {
  private fb = inject(FormBuilder);
  private filesFacade = inject(FilesFacade);
  private router = inject(Router);
  protected form: FormGroup;
  protected activeModal = inject(NgbActiveModal);
  protected invalidJsonMessage: WritableSignal<string | null> = signal(null);

  constructor() {
    this.form = this.fb.group({
      file: [null, Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.form.patchValue({ file });

    if (!file) {
      return;
    }

    // Let's check JSON validity (non-blocking)
    const reader = new FileReader();
    reader.onload = () => {
      try {
        JSON.parse(reader.result as string);
        this.invalidJsonMessage.set(null);
      } catch (e) {
        this.invalidJsonMessage.set(
          'This file contains invalid JSON. You can still upload it.'
        );
      }
    };
    reader.readAsText(file);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Add to list
    this.filesFacade.createFile({
      id: Date.now(), // for demo purposes
      name: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      filename: 'uploaded-file-name.json', // for demo purposes
      isValid: !this.invalidJsonMessage,
    });

    // close & redirect
    this.activeModal.close();
    this.router.navigateByUrl('/files');
  }
}
