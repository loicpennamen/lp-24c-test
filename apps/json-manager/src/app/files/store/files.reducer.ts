import { createReducer, on } from '@ngrx/store';
import { JsonFile } from '../models/json-file';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFile,
  deleteFile,
  loadFilesSuccess,
  resetFilesSuccess,
} from './files.actions';

export const adapter = createEntityAdapter<JsonFile>({
  selectId: (file) => file.id,
});

export const initialState: EntityState<JsonFile> = adapter.getInitialState();

export const filesReducer = createReducer(
  initialState,

  on(loadFilesSuccess, (state, data) => adapter.setAll(data.files, state)),
  on(resetFilesSuccess, (state, data) => adapter.setAll(data.files, state)),
  on(createFile, (state, file) => adapter.addOne(file, state)),
  on(deleteFile, (state, file) => adapter.removeOne(file.id, state))
);

export const { selectAll } = adapter.getSelectors();
