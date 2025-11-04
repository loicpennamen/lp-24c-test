import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesRoutingModule } from './files-routing-module';
import { EffectsModule } from '@ngrx/effects';
import { FilesEffects } from './store/files.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilesRoutingModule,
    EffectsModule.forFeature([FilesEffects]),
  ],
})
export class FilesModule {}
