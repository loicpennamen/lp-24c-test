import { inject, Injectable } from '@angular/core';
import { JsonFile } from '../models/json-file';
import { map, mapTo, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllFiles } from '../store/files.selectors';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private localStorageJsonFilesKey = 'json_files';
  private store = inject(Store);

  // Using observables to simulate an API call, loading locally.
  public getAllFiles(): Observable<JsonFile[]> {
    return new Observable((observer) => {
      let files = [];
      const storedJson = localStorage.getItem(this.localStorageJsonFilesKey);
      // No stored data
      if (!storedJson) {
        files = this.getDummyFiles();
      }
      // Stored data found
      else {
        try {
          files = JSON.parse(storedJson);
        } catch (error) {
          console.error(error);
          files = this.getDummyFiles();
        }
      }

      observer.next(files);
      observer.complete();
    });
  }

  saveFiles(): Observable<void> {
    return this.store.select(selectAllFiles).pipe(
      take(1),
      tap((files) => {
        localStorage.setItem(
          this.localStorageJsonFilesKey,
          JSON.stringify(files)
        );
      }),
      map(() => {
        return;
      })
    );
  }

  private getDummyFiles(): JsonFile[] {
    return [
      {
        id: 1,
        description: 'API OAS File',
        filename: 'TestSchema18276.json',
        isValid: true,
        name: 'Test Schema',
      },
      {
        id: 2,
        description: 'Latest endpoint updates',
        filename: 'filename2.json',
        isValid: true,
        name: 'Endpoint testing',
      },
      {
        id: 3,
        description: 'API schema',
        filename: 'TestSchema18276.json',
        isValid: false,
        name: 'New API',
      },
      {
        id: 4,
        description: 'Last run params by QA',
        filename: 'TestRun.json',
        isValid: true,
        name: 'LatestCompanyAPIRun',
      },
      {
        id: 3,
        description: 'Response JSON schema',
        filename: 'Schema887.json',
        isValid: true,
        name: 'Schema7751',
      },
    ];
  }
}
