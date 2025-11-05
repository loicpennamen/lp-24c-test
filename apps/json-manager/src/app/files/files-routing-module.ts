import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesList } from './components/files-list/files-list';

const routes: Routes = [{ path: '', component: FilesList }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
