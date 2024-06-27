import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  datos: { nombre: string; apellido: string; correo: string }[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const localStorage = window.localStorage;
    let datos = localStorage.getItem('registros');
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (Array.isArray(arreglo)) {
        this.datos = arreglo.map((item: any) => ({
          nombre: item.nombre,
          apellido: item.apellido,
          correo: item.correo,
        }));
      }
    }
  }

  agregarRegistro(dato: { nombre: string; apellido: string; correo: string }): void {
    this.datos.push(dato);
    this.actualizarLocalStorage();
  }

  eliminarRegistro(index: number): void {
    this.datos.splice(index, 1);
    this.actualizarLocalStorage();
  }

  actualizarLocalStorage(): void {
    const localStorage = window.localStorage;
    localStorage.setItem('registros', JSON.stringify(this.datos));
  }
}
