import { Component } from '@angular/core';
import { FormularioComponent } from './formulario/formulario.component';
import { TablaComponent } from './tabla/tabla.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioComponent, TablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ahd1';
}
