import { Routes } from "@angular/router";
 
export default[
    {
        path: 'zodiaco',
        loadComponent:()=>import('./zodiaco/zodiaco.component'),
    },
   
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'resistencia2',
        loadComponent:()=>import('./resistencia2/resistencia2.component'),
    },
    {
        path: 'empleados',
        loadComponent:()=>import('./empleados/empleados.component'),
    }
 
] as Routes