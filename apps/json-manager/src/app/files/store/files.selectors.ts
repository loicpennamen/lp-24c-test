import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './files.reducer';
import { EntityState } from '@ngrx/entity';
import { JsonFile } from '../models/json-file';

const selectFilesFeature =
  createFeatureSelector<EntityState<JsonFile>>('files');

export const selectAllFiles = createSelector(selectFilesFeature, selectAll);
