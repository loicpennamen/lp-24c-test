import { createReducer, on } from '@ngrx/store';
import { JsonFile } from '../models/json-file';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFile,
  createFileFailure,
  createFileSuccess,
  loadFiles,
  loadFilesFailure,
  loadFilesSuccess,
} from './files.actions';

export interface FilesCollectionState extends EntityState<JsonFile> {
  loading: boolean;
  error: any | null;
  count: number;
}

export const adapter = createEntityAdapter<JsonFile>({
  selectId: (file) => file.id,
});

export const initialState: FilesCollectionState = adapter.getInitialState({
  loading: false,
  error: null,
  count: -1,
});

export const filesReducer = createReducer(
  initialState,
  // load
  on(loadFiles, (state) => ({ ...state, loading: true, error: null })),
  on(loadFilesSuccess, (state, { files }) =>
    adapter.setAll(files, {
      ...state,
      loading: false,
      error: null,
      count: files.length,
    })
  ),
  on(loadFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    count: -1,
  })),

  // create
  on(createFile, (state) => ({ ...state, loading: true, error: null })),
  on(createFileSuccess, (state, { file }) =>
    adapter.addOne(file, { ...state, loading: false })
  ),
  on(createFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll } = adapter.getSelectors();
