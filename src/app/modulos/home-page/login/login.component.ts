import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms'
import { UsuarioModel } from 'src/app/model/usuario.model';
import { AutenticacionService } from '../services/autenticacion.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   usuario: UsuarioModel=new UsuarioModel();
   recordarme=false;
    public formLogin!: FormGroup;

    public errores = {};

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService, private router: Router,
        private autenticacionService:AutenticacionService
    ) { }

    ngOnInit(): void {
        this.iniciarFormulario();
    }

    private iniciarFormulario(): void {
        this.formLogin = this.formBuilder.group({
            usuario: ['kiqicafa@ryteto.me', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            contrasenia: ['10b91c2b633e322101446edf46f2e2b7', [Validators.required]]
        })
    }
    ingresar({ value, valid }: { value: any, valid: boolean }) {
        this.autenticacionService.ingresar(value).subscribe((resp: any) => {
            console.log(resp);
            sessionStorage.setItem("token", resp.tk);
            sessionStorage.setItem("datosUsuario", JSON.stringify(resp.datos))
            this.router.navigate(['app'])
        }, error => this.errores = error.error)

    }
    login(form:NgForm) {


      if (form.invalid){return;}
      Swal.fire({

        allowOutsideClick:false,

        text:'Espere por Favor...',


      });
      Swal.showLoading();

      this.auth.login(this.usuario).subscribe(resp=>{


        Swal.close();


        if(this.recordarme){
          localStorage.setItem('email',this.usuario.correo);

        }
        this.router.navigateByUrl('./../sobre-nosotros');

      },(err)=>{
        Swal.fire({


          title:"Error al Autentificar",

          text:err.error.error.message,


        });

      });

    }
}
