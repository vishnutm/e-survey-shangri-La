import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { SurveyListComponent } from './views/resident-user/components/survey-list/survey-list.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: RegisterComponent },
    ],
  },
  {
    path: 'resident',
    children: [
      { path: '', redirectTo: 'survey', pathMatch: 'full' },
      { path: 'survey', component: SurveyListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
