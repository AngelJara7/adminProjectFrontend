import { UserProject } from "../interfaces";
import { Column } from ".";

export class Task {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public asignacion: Date,
    public vencimiento: Date,
    public usuario: UserProject,
    public responsable: UserProject,
    public columna: Column,
  ) { }
}