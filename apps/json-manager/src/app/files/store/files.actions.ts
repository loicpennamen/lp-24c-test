import { createAction, props } from '@ngrx/store';
import { JsonFile } from '../models/json-file';

export const loadFiles = createAction('[Files] Load JSON files');
export const loadFilesSuccess = createAction(
  '[Files] Load Files Success',
  props<{ files: JsonFile[] }>()
);
export const loadFilesFailure = createAction(
  '[Files] Load Files Failure',
  props<{ error: any }>()
);

export const createFile = createAction(
  '[Files] Create a JSON file',
  props<{ file: JsonFile }>() // on passe le fichier directement ici
);
export const createFileSuccess = createAction(
  '[Files] Create File Success',
  props<{ file: JsonFile }>()
);
export const createFileFailure = createAction(
  '[Files] Create File Failure',
  props<{ error: any }>()
);
