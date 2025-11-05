import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FilesActions from './store/files.actions';
import { Observable } from 'rxjs';
import type { JsonFile } from './models/json-file';
import { selectAllFiles } from './store/files.selectors';

@Injectable({ providedIn: 'root' })
export class FilesFacade {
  private store = inject(Store);

  files$: Observable<JsonFile[]> = this.store.select(selectAllFiles);

  loadFiles() {
    this.store.dispatch(FilesActions.loadFiles());
  }

  resetFiles() {
    this.store.dispatch(FilesActions.resetFiles());
  }

  createFile(file: JsonFile) {
    this.store.dispatch(FilesActions.createFile(file));
  }

  deleteFile(file: JsonFile) {
    this.store.dispatch(FilesActions.deleteFile(file));
  }
}
