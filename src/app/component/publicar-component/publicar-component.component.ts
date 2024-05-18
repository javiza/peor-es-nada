import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonItem,
IonLabel,IonIcon,IonButton, IonInput,IonButtons } from '@ionic/angular/standalone';
import { cameraOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo,Camera,CameraResultType} from '@capacitor/camera';
import { NgForm } from '@angular/forms';
import { Publicacion, DatabaseService } from 'src/app/services/database.service';

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

  publicacion: Publicacion[] = []
  titulo:string = "";
  descripcion: string = "";
  // foto:Photo|null = null
  @ViewChild('formulario')
  formulario!: NgForm;

  constructor( 
    private dbService:DatabaseService
  ) { 
    this.inicializarPlugin();
    addIcons({
      cameraOutline
    })
  }
  async inicializarPlugin(){
    await this.dbService.iniciarPlugin();
    this.actualizar();
  }

  async ngOnInit() {
    try {
      await this.dbService.iniciarPlugin();
      this.actualizar();
    } catch (err) {
      console.error('Error al inicializar la base de datos:', err);
    }
  }
  async ngOnDestroy(){
    await this.dbService.cerrarConexion();
  }
  // async tomarFoto() {
  //   this.foto = await Camera.getPhoto({
  //     quality:90,
  //     resultType: CameraResultType.Uri,
  //     savtengo eToGallery:true,
  //     correctOrientation:true
  //   })
  // }
  async actualizar(){
  this.publicacion = await this.dbService.findAllPublicacion()
  }
  async agregar(form:NgForm){
    if(form.valid){
      const publicacion:Publicacion = {
        titulo: form.value.titulo,
        descripcion: form.value.descripcion
        // foto: this.foto?.webPath || '' 
        };
      await this.dbService.addPublicacion(publicacion);
      await this.actualizar();
      form.resetForm()
      // this.foto = null;
    }
  }
  async actualizarPublicacion(publicacion:Publicacion){
    const publicacionEditada = {
      id: publicacion.id,
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      // foto: publicacion.foto || ''
    }
    await this.dbService.updatePublicacion(publicacionEditada)
    await this.actualizar()
  }
  async eliminar(publicacion:Publicacion){
    if(publicacion.id){
      await this.dbService.deletePublicacion(publicacion.id)
      await this.actualizar()
    }
  }

}
