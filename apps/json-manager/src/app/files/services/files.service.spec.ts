import { TestBed } from '@angular/core/testing';
import { FilesService } from './files.service';
import { provideMockStore } from '@ngrx/store/testing';
import { InvalidJsonError } from '../dto/InvalidJsonError';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesService, provideMockStore({ initialState: {} })],
    });

    service = TestBed.inject(FilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkJsonString success', () => {
    const validJson =
      '[{"id":3,"description":"Response JSON schema","filename":"Schema887.json","isValid":true,"name":"Schema7751"}]';
    const invalidJson =
      '[{"id":3, _broken_value "description":"Response JSON schema","filename":"Schema887.json","isValid":true,"name":"Schema7751"}]';

    it('should return TRUE for valid json', () => {
      expect(service.checkJsonString(validJson)).toBeTruthy();
    });

    it('should throw an InvalidJsonError for invalid json', () => {
      expect(() => service.checkJsonString(invalidJson)).toThrowError(
        InvalidJsonError
      );
    });
  });
});
