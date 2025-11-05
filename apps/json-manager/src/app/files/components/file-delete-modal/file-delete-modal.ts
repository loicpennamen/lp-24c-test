import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import type { JsonFile } from '../../models/json-file';
import { ReactiveFormsModule } from '@angular/forms';
import { FilesFacade } from '../../files.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-delete-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './file-delete-modal.html',
  styleUrl: './file-delete-modal.sass',
})
export class FileDeleteModal {
  private filesFacade = inject(FilesFacade);
  private router = inject(Router);
  @Input() public file?: JsonFile;
  public activeModal = inject(NgbActiveModal);

  protected confirm() {
    if (!this.file) return;

    // Add to list
    this.filesFacade.deleteFile(this.file);

    // close and redirect
    this.activeModal.close();
    this.router.navigateByUrl('/files');
  }
}
