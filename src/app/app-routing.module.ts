import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analytics/analytics.module').then( m => m.AnalyticsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'expences',
    loadChildren: () => import('./pages/expences/expences.module').then( m => m.ExpencesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'office',
    loadChildren: () => import('./pages/office/office.module').then( m => m.OfficePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'setup',
    loadChildren: () => import('./pages/setup/setup.module').then( m => m.SetupPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	},
  {
    path: 'header',
    loadChildren: () => import('./pages/header/header.module').then( m => m.HeaderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}