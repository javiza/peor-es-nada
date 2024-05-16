import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButtons,
  IonIcon, IonImg, IonButton, IonLabel, IonList, IonItem, IonSearchbar, IonFabButton } 
  from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { trashOutline, add } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';
import { PublicarPage } from 'src/app/pages/publicar/publicar.page';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonHeader, IonFabButton,
    IonToolbar, IonTitle, IonContent, IonLabel, IonButtons, IonIcon,
    IonImg, IonList, IonItem, IonButton, IonCard, IonList,
    IonSearchbar
  ],
})
export class PublicacionesComponent implements OnInit {

  constructor(
    private navCtrl: NavController
  ) {
    addIcons({
      trashOutline, add
    })
  }

  ngOnInit() {}

  navigateToPage() {
    this.navCtrl.navigateForward('/src/pages/publicar.page.html');
  }
}