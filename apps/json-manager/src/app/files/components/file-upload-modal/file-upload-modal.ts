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
import { jsonFileExtensionValidator } from '../../../forms/validators/json-file-validator';
import { MustContainStringValidator } from '../../../forms/validators/must-contain-string-validator';
import { MustNotContainStringValidator } from '../../../forms/validators/must-not-contain-string-validator';
import { FilesService } from '../../services/files.service';
import { InvalidJsonError } from '../../dto/InvalidJsonError';

@Component({
  selector: 'app-file-upload-modal',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './file-upload-modal.html',
  styleUrl: './file-upload-modal.sass',
})
export class FileUploadModal {
  private fb = inject(FormBuilder);
  private filesFacade = inject(FilesFacade);
  private filesService = inject(FilesService);
  private router = inject(Router);
  protected form: FormGroup;
  protected activeModal = inject(NgbActiveModal);
  protected invalidJsonMessage: WritableSignal<string | null> = signal(null);

  constructor() {
    this.form = this.fb.group({
      file: [null, [Validators.required, jsonFileExtensionValidator]],
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z0-9-_]+$'),
          MustContainStringValidator('42c-loicpennamen'),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(128),
          MustNotContainStringValidator('42c-loicpennamen'),
        ],
      ],
    });
  }

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const control = this.form.get('file');

    this.invalidJsonMessage.set(null);
    control?.markAsTouched();
    control?.markAsDirty();
    control?.setValue(file);
    control?.updateValueAndValidity();

    if (!file) {
      return;
    }

    // Check JSON validity: non-blocking
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.filesService.checkJsonString(reader.result as string);
      } catch (err) {
        if (err instanceof InvalidJsonError) {
          this.invalidJsonMessage.set(
            'This file contains invalid JSON. You can still upload it.'
          );
        } else {
          throw err;
        }
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
