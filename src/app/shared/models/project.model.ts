import { Collaborators, UserProject } from "../interfaces";

export class Project {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public fecha: Date,
    public colaboradores: Collaborators[],
    public usuario: UserProject,
    public columas?: [],
    public clave?: string
  ) {}
}