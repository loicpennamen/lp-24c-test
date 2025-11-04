import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilesCollectionState, selectAll } from './files.reducer';

const selectFilesFeature = createFeatureSelector<FilesCollectionState>('files');

export const selectAllFiles = createSelector(selectFilesFeature, selectAll);
