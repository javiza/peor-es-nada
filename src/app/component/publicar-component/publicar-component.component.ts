import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonItem,
IonLabel,IonIcon,IonButton, IonInput,IonButtons } from '@ionic/angular/standalone';
import { cameraOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo,Camera,CameraResultType} from '@capacitor/camera';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-publicar-component',
  templateUrl: './publicar-component.component.html',
  styleUrls: ['./publicar-component.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, PublicarComponentComponent,
    IonToolbar, IonButtons,IonIcon, IonInput,IonItem, ReactiveFormsModule, IonLabel,
    CommonModule,IonText,FormsModule,
     IonButton
    ],
})
export class PublicarComponentComponent  implements OnInit {
  titulo!: string;
  descripcion!: string;
  foto:Photo|null = null
  constructor( ) { 
    addIcons({
      cameraOutline
    })
  }

  ngOnInit() {}

  async tomarFoto() {
    this.foto = await Camera.getPhoto({
      quality:90,
      resultType: CameraResultType.Uri,
      saveToGallery:true,
      correctOrientation:true
    })
  }
  guardar(formulario: NgForm){
    console.log('titulo:', this.titulo);
    console.log('descripcion:', this.descripcion);
    console.log('foto:', this.foto);
  }
    

}
