import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDeleteModal } from './file-delete-modal';

describe('FileDeleteModal', () => {
  let component: FileDeleteModal;
  let fixture: ComponentFixture<FileDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDeleteModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FileDeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
