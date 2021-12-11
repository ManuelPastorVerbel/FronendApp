import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private api = environment.host;

    constructor(
        private http: HttpClient
    ) { }

    public registrarCliente(datos: {}): Observable<{}> {
        const url = this.api + "/registro";
        return this.http.post<{}>(url, datos);
    }


}
