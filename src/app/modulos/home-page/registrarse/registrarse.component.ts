import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/usuario.model';
import {NgForm} from '@angular/forms'
import { FormErrorService } from 'src/app/servicios/form-error.service';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';

@Component({
    selector: 'app-registrarse',
    templateUrl: './registrarse.component.html',
    styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

    /**Variable que maneja el grupo de campos del formulario */
    usuario: UsuarioModel;
    recordarme=false;

    public formRegistro!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private clienteService: ClienteService,
        public errorsFormService: FormErrorService,
        private auth:AuthService

    ) { }

    ngOnInit(): void {
        this.inicializarFormulario();
        this.usuario= new UsuarioModel();
    }

    /**Funion que inicializa el formulario */
    private inicializarFormulario(): void {
        this.formRegistro = this.fb.group({
            nombreUsuario: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
            apellidoUsuario: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
            cedulaUsuario: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^([0-9])*$/)]],
            correoUsuario: ["", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            celularUsuario: ["", [Validators.required, Validators.minLength(7), Validators.pattern(/^([0-9])*$/)]],
            claveUsuario: ["", [Validators.required, Validators.minLength(3)]],
        })
    }

    /** Funcion que prmite recoger los datos del formulario, validar y enviar a guardar */
    public registrarCliente({ value, valid }: { value: any, valid: boolean }): void {
        console.log(value, valid)
        this.formRegistro.get('nombres')?.invalid
        if (!valid) {
            Swal.fire({
                html: "Existen campos invalidos",
                icon: "warning",
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonText: "Aceptar"
            })
            return;
        }
        value['estadoRegistro'] = "activo";

        this.clienteService.registrarCliente(value)
            .subscribe(resp => {
                Swal.fire({
                    html: "Su registro a sido exitoso",
                    icon: "success",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Aceptar"
                })
                this.formRegistro.reset();
                this.router.navigate(['login'])
            })


    }
    onSubmit(form:NgForm) {

      if (form.invalid){return;}

     /* Swal.fire({

        allowOutsideClick:false,

        text:'Espere por Favor...',


      });*/
     // Swal.showLoading();

       this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{

        //Swal.close();
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.correo);

        }


        this.router.navigateByUrl('/home');

       }, (err)=>{
        /*Swal.fire({

          type:'error',
          title:"Error al Autentificar",

          text:err.error.error.message,
        });*/

       });
     }


}
