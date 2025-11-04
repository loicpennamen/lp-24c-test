import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from './layout/components/layout/layout';
import { FilesFacade } from './files/files.facade';
import { FilesModule } from './files/files-module';

@Component({
  imports: [RouterModule, FilesModule, Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App implements OnInit {
  private filesFacade: FilesFacade = inject(FilesFacade);

  ngOnInit(): void {
    // Ready the files list
    this.filesFacade.loadFiles();
  }
}
