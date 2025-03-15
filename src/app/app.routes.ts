import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: SigninComponent
    },
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'home',
        component: LayoutComponent,
        loadChildren: () => import('./components/components.module').
        then(m=>m.ComponentsModule),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/login'
    }


];
