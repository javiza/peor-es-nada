import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule} from '@angular/router';
import { PublicarComponentComponent } from 'src/app/component/publicar-component/publicar-component.component';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, PublicarComponentComponent,IonToolbar, 
    CommonModule,RouterLink, RouterModule,
     IonButton
    ],
})
export class PublicarPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  navigateToPage() {
    this.router.navigate(['/publicaciones']);
  }
}
