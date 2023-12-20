import { UserProject } from "../interfaces";
import { Column, Project } from ".";

export class Task {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public asignacion: Date,
    public vencimiento: Date | string,
    public usuario: UserProject,
    public responsable: UserProject,
    public proyecto: Project,
    public columna: string,
  ) { }
}