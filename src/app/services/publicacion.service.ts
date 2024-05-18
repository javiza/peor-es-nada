import { Injectable } from '@angular/core';
import { Publicacion, DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(
    private databaseService:DatabaseService
  ) { }
  async agregarPublicacion(publicacion:Publicacion){
    this.databaseService.insertar(publicacion)
  }
  async getPublicacion():Promise<Publicacion[]>{
    return this.databaseService.obtenerTodos()
  }
  async editar(publicacion:Publicacion){
    await this.databaseService.actualizar(publicacion)
  }
  async eliminar(publicacion:Publicacion){
    if(publicacion.id != undefined && publicacion.id > 0 ){
      await this.databaseService.eliminar(publicacion.id)
    }
  }
}
