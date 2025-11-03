import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesList } from './files-list';

describe('FilesListComponent', () => {
  let component: FilesList;
  let fixture: ComponentFixture<FilesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesList],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
