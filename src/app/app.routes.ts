import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-posts',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'job-posts',
    loadComponent: () => import('./job-posts/job-posts.page').then((m) => m.JobPostsPage),
  },
];
