import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { AuthGuard } from '../Guards/auth.guard';
import { CrudComponent } from './crud/crud.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { roles: ['dashboard_access'], preload: true},
        canActivate: [AuthGuard]
      },
      {
        path: 'crud',
        component: CrudComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
