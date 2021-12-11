import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/home-page/login/login.component';
import { RegistrarseComponent } from './modulos/home-page/registrarse/registrarse.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'principal', loadChildren: () => import('./modulos/home-page/home-page.module').then(m => m.HomePageModule),canActivate:[AuthGuard]
},
  { path: 'registro', component:RegistrarseComponent  },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
