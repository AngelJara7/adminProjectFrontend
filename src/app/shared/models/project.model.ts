import { Column, Task } from ".";
import { Collaborators, UserProject } from "../interfaces";


export class Project {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public creacion: string | Date,
    public colaboradores: Collaborators[],
    public usuario: UserProject,
    public tareas?: Task[],
    public columnas?: Column[],
    public clave?: string
  ) {}
}