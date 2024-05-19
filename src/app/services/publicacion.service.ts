import { Injectable } from '@angular/core';
import { Publicacion, DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  constructor(private databaseService: DatabaseService) { }

  async agregarPublicacion(publicacion: Publicacion) {
    try {
      await this.databaseService.insertar(publicacion);
    } catch (error) {
      console.error('Error al agregar la publicación:', error);
      throw error; // Propagar el error para que pueda ser manejado por el componente que llama a este método
    }
  }

  async getPublicacion(): Promise<Publicacion[]> {
    try {
      return await this.databaseService.obtenerTodos();
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      throw error; // Propagar el error para que pueda ser manejado por el componente que llama a este método
    }
  }

  async editar(publicacion: Publicacion) {
    try {
      await this.databaseService.actualizar(publicacion);
    } catch (error) {
      console.error('Error al editar la publicación:', error);
      throw error; // Propagar el error para que pueda ser manejado por el componente que llama a este método
    }
  }

  async eliminar(publicacion: Publicacion) {
    try {
      if (publicacion.id !== undefined && publicacion.id > 0) {
        await this.databaseService.eliminar(publicacion.id);
      }
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      throw error; // Propagar el error para que pueda ser manejado por el componente que llama a este método
    }
  }
}
