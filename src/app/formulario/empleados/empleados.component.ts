import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasExtras: number;
  subTotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export default class RegistroEmpleadosComponent {
  formGroup: FormGroup;
  empleados: Empleado[] = [];
  totalAPagar: number = 0;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horasTrabajadas: [''],
    });
  }

  registrarEmpleado(): void {
    const empleado: Empleado = {
      matricula: this.formGroup.get('matricula')?.value,
      nombre: this.formGroup.get('nombre')?.value,
      correo: this.formGroup.get('correo')?.value,
      edad: this.formGroup.get('edad')?.value,
      horasTrabajadas: this.formGroup.get('horasTrabajadas')?.value,
      horasExtras: 0,
      subTotal: 0,
    };
  
    const costoHora = 70;
    const costoHoraExtra = 140;
  
    if (empleado.horasTrabajadas > 40) {
      empleado.horasExtras = empleado.horasTrabajadas - 40;
      empleado.subTotal = (40 * costoHora) + (empleado.horasExtras * costoHoraExtra);
    } else {
      empleado.subTotal = empleado.horasTrabajadas * costoHora;
    }
  
    this.empleados.push(empleado);
    this.calcularTotalAPagar();
  
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  
    this.formGroup.reset();
  }
 

  calcularTotalAPagar(): void {
    this.totalAPagar = this.empleados.reduce((total, empleado) => total + empleado.subTotal, 0);
  }

  imprimirTabla(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
      this.calcularTotalAPagar();
    }
  }

  modificarEmpleado(matricula: string): void {
    console.log(`Modificando empleado con matrícula: ${matricula}`);
    const empleadoIndex = this.empleados.findIndex((emp) => emp.matricula === matricula);
  
    if (empleadoIndex !== -1) {
      const empleado = this.empleados[empleadoIndex];
  
      this.formGroup.patchValue({
        matricula: empleado.matricula,
        nombre: empleado.nombre,
        correo: empleado.correo,
        edad: empleado.edad,
        horasTrabajadas: empleado.horasTrabajadas,
      });
  
      this.empleados.splice(empleadoIndex, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
    }
  }
  

  eliminarEmpleado(matricula: string): void {
    console.log(`Eliminando empleado con matrícula: ${matricula}`);
    this.empleados = this.empleados.filter((emp) => emp.matricula !== matricula);
    this.calcularTotalAPagar();
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.imprimirTabla();
  }
  
}
