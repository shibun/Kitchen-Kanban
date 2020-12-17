import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { KitchensComponent } from './components/kitchens/kitchens.component';
import { ItemsComponent } from './components/items/items.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
];
@NgModule({
  imports: [RouterModule.forRoot([
  {path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'kitchens', component: KitchensComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'reports', component: ReportsComponent },
  {path: '**', redirectTo: '/login'}
  ])],
exports: [RouterModule]
})
export class AppRoutingModule { }