import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  @Output() registroAgregado = new EventEmitter<any>();
  datos: any[];

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    this.datos = [];
    let datos = localStorage?.getItem('registros');
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (Array.isArray(arreglo)) {
        this.datos = arreglo;
      }
    }
  }

  registroFormulario = new FormGroup(
    {
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*.])/), // Al menos un número y un carácter especial
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  enviar() {
    if (this.registroFormulario.valid) {
      const formValue = this.registroFormulario.value;
      this.datos.push(formValue);
      const localStorage = this.document.defaultView?.localStorage;
      if (localStorage) {
        localStorage.setItem('registros', JSON.stringify(this.datos));
      }
      this.registroAgregado.emit(formValue);
    }
    this.registroFormulario.reset();
  }
}
