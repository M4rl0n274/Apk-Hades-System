import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonInput, IonButton, IonSpinner, IonToast, IonNote, IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';

import { ClientesService } from '../services/clientes';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonInput, IonButton, IonSpinner, IonToast, IonNote, IonIcon
  ]
})
export class Tab1Page {

  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  clienteForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.maxLength(50)]],
    edad: ['', [Validators.required, Validators.min(1)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    documentoIdentidad: ['', [Validators.required, Validators.maxLength(50)]],
    direccion: ['', [Validators.required, Validators.maxLength(200)]],
    telefono: ['', [Validators.required, Validators.maxLength(20)]],
    FechaDeNacimiento: ['', [Validators.required]]
  });

  guardando = false;
  toastMessage = '';
  toastColor = 'success';
  isToastOpen = false;

  constructor() {
    addIcons({ personAddOutline });
  }

  registrarCliente() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const datosCliente = {
      ...this.clienteForm.value,
      edad: Number(this.clienteForm.value.edad)
    };

    this.clientesService.crear(datosCliente).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarToast('Cliente registrado correctamente', 'success');
        this.clienteForm.reset();
        // Navegar a la pestaña de clientes para ver la lista actualizada
        this.router.navigate(['/tabs/tab2']);
      },
      error: (err) => {
        this.guardando = false;
        const msg = err?.error?.message || 'Error al guardar el cliente. Revisa los datos o la conexión.';
        this.mostrarToast(msg, 'danger');
      }
    });
  }

  mostrarToast(mensaje: string, color: 'success' | 'danger') {
    this.toastMessage = mensaje;
    this.toastColor = color;
    this.isToastOpen = true;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
