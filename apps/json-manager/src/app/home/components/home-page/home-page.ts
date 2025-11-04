import { Component, inject, signal } from '@angular/core';
import { FilesFacade } from '../../../files/files.facade';
import { I18nPluralPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModal } from '../../../files/components/file-upload-modal/file-upload-modal';

@Component({
  selector: 'app-home-page',
  imports: [I18nPluralPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePageComponent {
  private filesFacade = inject(FilesFacade);
  private modalService = inject(NgbModal);
  protected filesCount = signal(0);

  constructor() {
    this.filesFacade.files$.subscribe((files) => {
      this.filesCount.set(files.length);
    });
  }

  protected uploadFile() {
    const modalRef = this.modalService.open(FileUploadModal, {
      backdrop: 'static',
      centered: true,
    });
  }
}
