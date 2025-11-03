import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home-routing-module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./files/files-routing-module').then((m) => m.FilesRoutingModule),
  },
];
