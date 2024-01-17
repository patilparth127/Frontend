import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './AuthGuard/authentication.guard';
import { UnauthenticatedGuard } from './AuthGuard/unauthenticated.guard';
  const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/Auth' },
    {
      path: 'Auth',
      loadChildren: () =>
        import('./components/authentication/authentication.module').then(
          (m) => m.AuthenticationModule
        ),
        canActivate: [UnauthenticatedGuard],
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./components/deshboardcomponents/dashboard.module').then(
          (m) => m.DashboardModule
        ),
      canActivate: [AuthenticationGuard],
    },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
