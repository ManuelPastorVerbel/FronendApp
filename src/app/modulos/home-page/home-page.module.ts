import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ProductosServiciosComponent } from './productos-servicios/productos-servicios.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
    declarations: [
        HomePageComponent,
        ProductosServiciosComponent,
        LoginComponent,
        RegistrarseComponent,
        SobreNosotrosComponent,
        ContactenosComponent,
        PrincipalComponent
    ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class HomePageModule { }
