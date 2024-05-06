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
  {
    path: 'job-info/:id',
    loadComponent: () => import('./job-info/job-info.page').then((m) => m.JobInfoPage)
  },
  {
    path: 'pending-requests',
    loadComponent: () => import('./pending-requests/pending-requests.page').then((m) => m.PendingRequestsPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then((m) => m.FavoritesPage)
  },
  {
    path: 'archived',
    loadComponent: () => import('./archived/archived.page').then((m) => m.ArchivedPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then((m) => m.AccountPage)
  },
];
