import { inject, Injectable } from '@angular/core';
import * as FilesActions from './files.actions';
import { FilesService } from '../services/files.service';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class FilesEffects {
  private actions$ = inject(Actions);
  private filesService = inject(FilesService);

  // Load files
  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.loadFiles),
      mergeMap(() =>
        this.filesService.getAllFiles().pipe(
          map((files) => FilesActions.loadFilesSuccess({ files: files })),
          catchError((error) => of(FilesActions.loadFilesFailure({ error })))
        )
      )
    )
  );

  // Reset files
  resetFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.resetFiles),
      mergeMap(() =>
        this.filesService.reset().pipe(
          map((files) => FilesActions.resetFilesSuccess({ files: files })),
          catchError((error) => of(FilesActions.loadFilesFailure({ error })))
        )
      )
    )
  );

  // On file created
  createFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilesActions.createFile),
        mergeMap(() =>
          // Save files list
          this.filesService.saveFiles().pipe(
            catchError((error) => {
              console.error('Error when saving files', error);
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  // On file deleted
  deleteFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilesActions.deleteFile),
        mergeMap(() =>
          // Save files list
          this.filesService.saveFiles().pipe(
            catchError((error) => {
              console.error('Error when saving files', error);
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );
}
