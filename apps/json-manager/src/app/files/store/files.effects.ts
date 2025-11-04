import { inject, Injectable } from '@angular/core';
import * as FilesActions from './files.actions';
import { FilesService } from '../services/files.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class FilesEffects {
  private actions$ = inject(Actions);
  private filesService = inject(FilesService);

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.loadFiles),
      mergeMap(() =>
        this.filesService.getAllFiles().pipe(
          map((files) => FilesActions.loadFilesSuccess({ files })),
          catchError((error) => of(FilesActions.loadFilesFailure({ error })))
        )
      )
    )
  );

  crateFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.createFile),
      map((file) => FilesActions.createFileSuccess(file)),
      catchError((error) => of(FilesActions.createFileFailure({ error })))
    )
  );
}
