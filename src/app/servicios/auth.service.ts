import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCXBU1xlhrVwAToR0HTdU8loKCi5L0BiNY';
  userToken:string;

 //crear nuevo usaurio
 //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
 //login
 //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http:HttpClient) {
    this.leerToken();

   }

   logout() {
     localStorage.removeItem('Token');


   }
   login(usuario:UsuarioModel) {
    const authdata={
      email:usuario.correo,
      password:usuario.clave,
      returnsSecureToken:true
    };

    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apikey}`,authdata).pipe(
      map(resp=>{this.guardarToken(resp['idToken']);return resp;}));
   }

   nuevoUsuario(usuario:UsuarioModel) {

    const authdata={
      email:usuario.correo,
      password:usuario.clave,
      returnsSecureToken:true
    };
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apikey}`,authdata).pipe(map(resp=>{this.guardarToken(resp['idToken']); return resp;}));



   }

  private guardarToken(idToken:string){

   this.userToken=idToken;
   localStorage.setItem('token',idToken);

   let hoy=new Date();
   hoy.setSeconds(3600);

   localStorage.setItem('expira',hoy.getTime().toString());


  }
  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token')
    }else{
      this.userToken='';
    }
  }

  estarAutenticado():boolean{

   if(this.userToken.length<2){
     return false;
   }
   const expira=Number(localStorage.getItem('expira'));
   const expiraDate=new Date();
   expiraDate.setTime(expira)

if(expiraDate>new Date()){
  return true;
}else{
  return false;
}



   // return this.userToken.length > 2;
  }

}
