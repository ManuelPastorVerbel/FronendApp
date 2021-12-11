import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {
    private api = environment.host;

    constructor(
        private http: HttpClient
    ) { }

    ingresar(datosCredenciales: any) {
        return this.http.post<{}>(`${this.api}/ingresar`,
            { usuario: datosCredenciales.usuario, clave: datosCredenciales.contrasenia })

    }

    /**Obtemer el token del usuario autenticado */
    get tokenUsuario() {
        return sessionStorage.getItem("token")
    }

    /**Verificar si el usuario esta autenticado */
    get estaAutenticado(): boolean {
        return this.tokenUsuario != null;
    }

    /** Obtner los datos del usuario */
    get datosUsuario() {
        const datosUsuario = sessionStorage.getItem('datosUsuario') || ""
        return JSON.parse(datosUsuario)
    }

    private eliminarSession() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("datosUsuario");
    }

    /**Funcion para cerrar la sesion y salir del sistema */
    public salirSistema() {
        this.eliminarSession();
    }

}
