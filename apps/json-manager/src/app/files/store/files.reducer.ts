import { createReducer, on } from '@ngrx/store';
import { JsonFile } from '../models/json-file';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { loadFiles, loadFilesFailure, loadFilesSuccess } from './files.actions';

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
  on(loadFiles, (state) => ({ ...state, loading: true, error: null })),
  on(loadFilesSuccess, (state, { files }) =>
    adapter.setAll(files, { ...state, loading: false })
  ),
  on(loadFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
