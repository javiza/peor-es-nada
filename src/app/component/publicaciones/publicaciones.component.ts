import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButtons,
  IonIcon, IonImg, IonButton, IonLabel, IonList, IonItem, IonSearchbar, IonFabButton } 
  from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { trashOutline, add } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { Router, RouterModule } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { DatabaseService, Publicacion } from 'src/app/services/database.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonHeader, IonFabButton,
    IonToolbar, IonTitle, IonContent, IonLabel, IonButtons, IonIcon,
    IonImg, IonList, IonItem, IonButton, IonCard, IonList,
    IonSearchbar, RouterModule
  ],
})
export class PublicacionesComponent implements OnInit {
  publicacion: Publicacion[] = []

  constructor(
    private router: Router, private publicacionService:PublicacionService,
    private databaseService: DatabaseService
  ) {
    addIcons({
      trashOutline, add
    })
  }
  async ngOnInit(){
    try {
      await this.databaseService.iniciarPlugin();
      this.actualizar();
    } catch (err) {
      console.error('Error al inicializar la base de datos:', err);
    }
  }

  async inicializarPlugin(){
    await this.databaseService.iniciarPlugin();
    this.actualizar();
  }


  async ngOnDestroy(){
    await this.databaseService.cerrarConexion();
  }
  async actualizar(){
    this.publicacion = await this.publicacionService.getPublicacion()
    }
  async navigateToPage() {
    await this.router.navigate(['/publicar']);
  }
  async mostrar(){
    
  }
}  
 