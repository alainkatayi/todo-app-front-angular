import { Routes } from '@angular/router';
import { LoginComponent } from './composants/login/login.component';
import { RegisterComponent } from './composants/register/register.component';
import { DashboardComponent } from './composants/dashboard/dashboard.component';
import { CreateComponent } from './composants/create/create.component';
import { UpdateComponent } from './composants/update/update.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        title:'login'
    },

    {
        path:'register',
        component:RegisterComponent,
        title:'register'
    },

    {
        path:'dashboard',
        component:DashboardComponent,
        title:'dashboard'
    },

    {
        path:'create',
        component:CreateComponent,
        title:'create-task'
    },

    {
        path:'update/:id',
        component:UpdateComponent,
        title:'update'
    }
];
