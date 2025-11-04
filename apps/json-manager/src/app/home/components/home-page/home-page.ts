import { Component, inject, signal } from '@angular/core';
import { FilesFacade } from '../../../files/files.facade';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [I18nPluralPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePageComponent {
  private filesFacade = inject(FilesFacade);
  protected filesCount = signal(0);

  constructor() {
    this.filesFacade.files$.subscribe((files) => {
      this.filesCount.set(files.length);
    });
  }
}
