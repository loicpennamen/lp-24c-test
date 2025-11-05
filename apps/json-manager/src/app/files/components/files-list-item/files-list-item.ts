import {
  Component,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { JsonFile } from '../../models/json-file';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FileDeleteModal } from '../file-delete-modal/file-delete-modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-files-list-item]',
  imports: [NgbTooltip],
  templateUrl: './files-list-item.html',
  styleUrl: './files-list-item.sass',
})
export class FilesListItem {
  @Input({ required: true }) public file?: JsonFile;
  @ViewChild('default') childComponentTemplate?: TemplateRef<any>;
  private modalService = inject(NgbModal);

  protected deleteFile(file: JsonFile) {
    const modalRef = this.modalService.open(FileDeleteModal, {
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.file = file;
  }
}
