import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export class ZodiacoComponent {
  zodiacoForm: FormGroup;
  
  edad: number = 0;
  signoZodiacal: string = '';
  signoChino: string = '';
  currentYear: number = new Date().getFullYear();

  constructor() {
    this.zodiacoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apaterno: new FormControl('', Validators.required),
      amaterno: new FormControl('', Validators.required),
      dia: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
      mes: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      anio: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]),
      sexo: new FormControl('', Validators.required)
    });
  }

  calcularEdad() {
    const diaNacimiento = this.zodiacoForm.get('dia')?.value;
    const mesNacimiento = this.zodiacoForm.get('mes')?.value;
    const anioNacimiento = this.zodiacoForm.get('anio')?.value;
    const fechaActual = new Date();
  
    if (anioNacimiento && mesNacimiento && diaNacimiento) {
      let edad = fechaActual.getFullYear() - anioNacimiento;
  
      // Verifica si aún no ha cumplido años este año
      if (fechaActual.getMonth() + 1 < mesNacimiento || (fechaActual.getMonth() + 1 === mesNacimiento && fechaActual.getDate() < diaNacimiento)) {
        edad--;
      }
  
      this.edad = edad;
    } else {
      this.edad = 0; // Si faltan datos, se asigna 0 para evitar errores
    }
  }
  

  calcularSignoZodiacal() {
    const dia = this.zodiacoForm.get('dia')?.value;
    const mes = this.zodiacoForm.get('mes')?.value;

    if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 20)) {
      this.signoZodiacal = 'Aries';
    }
    // Agregar el resto de los signos zodiacales...
  }

  calcularSignoChino() {
    const anio = this.zodiacoForm.get('anio')?.value;
    const signosChinos = ['Mono', 'Gallo', 'Perro', 'Cerdo', 'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra'];
    this.signoChino = signosChinos[anio % 12];
  }

  onSubmit() {
    if (this.zodiacoForm.valid) {
      this.calcularEdad();        // Cálculo de la edad
      this.calcularSignoZodiacal(); // Cálculo del signo zodiacal
      this.calcularSignoChino();   // Cálculo del signo chino
    }
  }
}
