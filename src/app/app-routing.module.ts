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
    path: 'expenses',
    loadChildren: () => import('./pages/expense/expenses.module').then( m => m.ExpensesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

  },
  {
    path: 'work',
    loadChildren: () => import('./pages/office/office.module').then( m => m.OfficePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'setup',
    loadChildren: () => import('./pages/setup/setup.module').then( m => m.SetupPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'studies',
    loadChildren: () => import('./pages/studies/studies.module').then( m => m.StudiesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'achievement',
    loadChildren: () => import('./pages/achievement/achievement.module').then( m => m.AchievementPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'time',
    loadChildren: () => import('./pages/time/time.module').then( m => m.TimePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
