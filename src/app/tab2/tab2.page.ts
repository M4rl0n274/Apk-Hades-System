import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonAvatar, IonNote, IonRefresher, IonRefresherContent,
  IonSpinner, IonIcon, IonBadge, IonButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { peopleOutline, refreshOutline, personOutline } from 'ionicons/icons';

import { ClientesService } from '../services/clientes';
import { Clientes, Meta } from '../models/clientes';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonAvatar, IonNote, IonRefresher, IonRefresherContent,
    IonSpinner, IonIcon, IonBadge, IonButton
  ]
})
export class Tab2Page {

  private clientesService = inject(ClientesService);

  clientes: Clientes[] = [];
  meta?: Meta;
  cargando = false;
  error = '';

  constructor() {
    addIcons({ peopleOutline, refreshOutline, personOutline });
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar(evento?: any) {
    this.cargando = !evento;
    this.error = '';

    this.clientesService.listar().subscribe({
      next: (res) => {
        // Maneja la respuesta en caso de ser objeto de paginación o un listado directo
        this.clientes = Array.isArray(res) ? res : (res.data || []);
        this.meta = res.meta;
        this.cargando = false;
        evento?.target?.complete();
      },
      error: (err) => {
        this.cargando = false;
        evento?.target?.complete();
        this.error = err.status === 0
          ? 'No se pudo conectar al servidor. Verifica que Flask esté corriendo y tenga CORS habilitado.'
          : `Error ${err.status} al cargar los clientes`;
      }
    });
  }

  inicial(nombre: string): string {
    return nombre?.charAt(0).toUpperCase() || '?';
  }

  trackById(_: number, cliente: Clientes): number {
    return cliente.id!;
  }
}
