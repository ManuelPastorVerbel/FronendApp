import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosServiciosComponent } from './productos-servicios/productos-servicios.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
    { path: 'productos-servicios', component: ProductosServiciosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'sobreNosotros', component: SobreNosotrosComponent },
    { path: 'contactenos', component: ContactenosComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: '**', redirectTo: 'registro' }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule { }
