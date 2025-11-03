import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesModule } from './files-module';

const routes: Routes = [{ path: '', component: FilesModule }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
