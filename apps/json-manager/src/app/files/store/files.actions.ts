import { createAction, props } from '@ngrx/store';
import { JsonFile } from '../models/json-file';

export const loadFiles = createAction('[Files] Load Files');
export const loadFilesSuccess = createAction(
  '[Files] Load Files success',
  props<{ files: JsonFile[] }>()
);
export const loadFilesFailure = createAction(
  '[Files] Load Files Failure',
  props<{ error: any }>()
);

export const createFile = createAction(
  '[Files] Create a JSON file',
  props<JsonFile>()
);
export const deleteFile = createAction(
  '[Files] Delete a JSON file',
  props<JsonFile>()
);
