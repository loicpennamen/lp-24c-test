import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [NgbNavModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})
export class Header {}
