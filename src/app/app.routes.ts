import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
   {
    path :'',
    title:'home',
    component: HomeComponent,
    pathMatch: 'full'
   },
   {
    path:'login',
    component: LoginComponent
   },
   {
      path:'register',
      component: RegisterComponent
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })
 export class AppRoutingModule {}