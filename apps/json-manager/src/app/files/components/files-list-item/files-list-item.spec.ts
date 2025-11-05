import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesListItem } from './files-list-item';

describe('FilesListItem', () => {
  let component: FilesListItem;
  let fixture: ComponentFixture<FilesListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
