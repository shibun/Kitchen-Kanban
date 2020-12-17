import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard'

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authInterceptorProviders } from '../helpers/auth.interceptor';
import { UsersComponent } from './components/users/users.component';
import { KitchensComponent } from './components/kitchens/kitchens.component';
import { ItemsComponent } from './components/items/items.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    KitchensComponent,
    ItemsComponent,
    ReportsComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
