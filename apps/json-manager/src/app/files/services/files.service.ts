import { Injectable } from '@angular/core';
import { JsonFile } from '../models/json-file';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private localStorageJsonFilesKey = 'json_files';

  /**
   * Using an observable to simulate an API call, loading locally.
   */
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
      this.saveFiles(files);
      observer.next(files);
      observer.complete();
    });
  }

  private saveFiles(files: JsonFile[]) {
    localStorage.setItem(this.localStorageJsonFilesKey, JSON.stringify(files));
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
