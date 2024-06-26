
import { CapacitorSQLite,SQLiteConnection,SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

export interface Publicacion{
  id?:number;
  titulo:string;
  descripcion:string;
  // foto:string | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  platform: string = "";

  private readonly DB_NAME  = "publicaciones_peoresnada"
  private readonly DB_VERSION = 1
  private readonly DB_ENCRYPTION = false
  private readonly DB_MODE = "no_encryption"
  private readonly DB_READ_ONLY = false

  private readonly DB_TABLE_NAME = "publicacion"
  private readonly DB_COL_ID = "id"
  private readonly DB_COL_TITULO = "titulo"
  private readonly DB_COL_DESCRIPCION = "descripcion"

  private readonly DB_SQL_TABLES = `
    CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME} (
      ${this.DB_COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.DB_COL_TITULO} TEXT NOT NULL,
      ${this.DB_COL_DESCRIPCION} TEXT NOT NULL
    );`
  
  
constructor() { }

  async iniciarPlugin() {
    try {
        console.log("DbService::iniciarPlugin");
        this.platform = Capacitor.getPlatform();
        console.log("DbService::iniciarPlugin platform=" + this.platform);

        if (this.platform === "web") {
            await customElements.whenDefined('jeep-sqlite');
            const jeepSqliteE1 = document.querySelector('jeep-sqlite');
            if (jeepSqliteE1 !== null) {
                console.log("DbService::iniciarPlugin::initWebstore");
                await this.sqlite.initWebStore();
            }
        }

        console.log("sqlite::createConnection()");
        const ret = await this.sqlite.checkConnectionsConsistency();
        const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
        if (ret.result && isConn) {
            this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
        } else {
            this.db = await this.sqlite.createConnection(
                this.DB_NAME,
                this.DB_ENCRYPTION,
                this.DB_MODE,
                this.DB_VERSION,
                this.DB_READ_ONLY
            );
        }

        await this.db.open();
        console.dir(this.db);

        console.log("db.execute(SQL_TABLES)");
        console.log(this.DB_SQL_TABLES);
        await this.db.execute(this.DB_SQL_TABLES);

        if (this.platform === "web") {
            console.log("DbService::iniciarPlugin::saveStore()");
            await this.sqlite.saveToStore(this.DB_NAME);
        }
    } catch (e) {
        console.error("Error al iniciar el plugin de SQLite:", e);
    }
}

    async cerrarConexion(){
      await this.db.close()
    }
    async obtenerTodos(): Promise<Publicacion[]> {
      if (!this.db) {
        await this.iniciarPlugin()
        
      }
      const sql = `SELECT * FROM ${this.DB_TABLE_NAME}`;
      console.log(sql);
      const resultado = (await this.db.query(sql)).values;
      return resultado ?? [];
  }
  
  
  async insertar(publicacion: Publicacion) {
      if (!this.db) {
        await this.iniciarPlugin(); 
      }
      const sql = `INSERT INTO ${this.DB_TABLE_NAME} (${this.DB_COL_TITULO}, ${this.DB_COL_DESCRIPCION}) VALUES (?,?)`;
      await this.db.run(sql, [publicacion.titulo, publicacion.descripcion]);
  }
  
  async actualizar(publicacion: Publicacion) {
      if (!this.db) {
        await this.iniciarPlugin(); 
      }
      const sql = `UPDATE ${this.DB_TABLE_NAME} SET ${this.DB_COL_TITULO} = ?, ${this.DB_COL_DESCRIPCION} = ? WHERE ${this.DB_COL_ID} = ?`;
      await this.db.run(sql, [publicacion.titulo, publicacion.descripcion, publicacion.id]);
  }
  
  async eliminar(id: number) {
      if (!this.db) {
        await this.iniciarPlugin(); 
      }
      const sql = `DELETE FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_ID} = ?`;
      await this.db.run(sql, [id]);
  }   
}
