import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormErrorService {

    // @ts-ignore
    errorMap: { [key: string]: (c: AbstractControl, name: string) => string } = {
        required: (c: FormControl, name: string) => `${name} es obligatorio`,
        email: (c: FormControl, name: string) => `'${c.value}' no es un correo valido`,
        maxlength: (c: FormControl, name: string) => `${name} debe ser de ${c.errors['maxlength'].requiredLength} caracteres o menos `,
        max: (c: FormControl, name: string) => `${name} debe ser menor o igual ${c.errors['max'].max}`,
        pattern: (c: AbstractControl, name: string) => `'${c.value}' no cumple con el formato ${c.errors['pattern'].requiredPattern}`,
        bsDate: (c: AbstractControl, name: string) => `'${c.value}' no es una fecha válida`,
    };

    mapErrors(control: AbstractControl | null, name: string): string[] {
        try {
            return Object.keys(control.errors || {})
                .map(key => this.errorMap[key](control, name));
        } catch {
            console.log(control.errors);
            // @ts-ignore 
            return;
        }
    }
}
