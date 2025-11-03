import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from './layout/components/layout/layout';

@Component({
  imports: [RouterModule, Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App {
  protected title = 'json-manager';
}
