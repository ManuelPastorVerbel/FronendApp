import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductosServiciosService {
    private api = environment.host
    constructor(
        private http: HttpClient
    ) { }

    obtenerServicios(): Observable<Array<any>> {
        return this.http.get<Array<any>>(`${this.api}/inmueble`)
    }
}
