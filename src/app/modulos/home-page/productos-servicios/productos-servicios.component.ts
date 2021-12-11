import { Component, OnInit } from '@angular/core';
import { ProductosServiciosService } from '../services/productos-servicios.service';

@Component({
    selector: 'app-productos-servicios',
    templateUrl: './productos-servicios.component.html',
    styleUrls: ['./productos-servicios.component.css']
})
export class ProductosServiciosComponent implements OnInit {
    listaInmuebles: any[] = [];
    constructor(
        private inmueblesServicio: ProductosServiciosService,
    ) { }

    ngOnInit(): void {
        this.cargarInmuebles();
    }

    cargarInmuebles() {
        this.inmueblesServicio.obtenerServicios().subscribe(resp => {
            this.listaInmuebles = resp
            console.log(resp);
        })
    }

}
