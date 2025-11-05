import { Component, inject, signal, WritableSignal } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { FilesFacade } from '../../files.facade';
import { FileUploadModal } from '../file-upload-modal/file-upload-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonFile } from '../../models/json-file';
import { FilesListItem } from '../files-list-item/files-list-item';

@Component({
  selector: 'app-files-list',
  imports: [I18nPluralPipe, FilesListItem],
  templateUrl: './files-list.html',
  styleUrl: './files-list.sass',
})
export class FilesList {
  private filesFacade = inject(FilesFacade);
  private modalService = inject(NgbModal);
  protected filesCount = signal(0);
  protected files: WritableSignal<JsonFile[]> = signal([]);

  constructor() {
    this.filesFacade.files$.subscribe((files) => {
      this.filesCount.set(files.length);
      this.files.set(files.reverse());
    });
  }

  protected uploadFile() {
    this.modalService.open(FileUploadModal, {
      backdrop: 'static',
      centered: true,
    });
  }

  protected resetList() {
    this.filesFacade.resetFiles();
  }
}
