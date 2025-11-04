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
