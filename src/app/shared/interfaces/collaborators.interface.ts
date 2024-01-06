import { UserProject } from ".";
import { Project } from "../models";

enum Rol {
  creador = 'creador',
  admin = 'admin',
  colaborador = 'colaborador'
}

export interface Collaborators {
  _id: string,
  proyecto: Project,
  usuario: UserProject,
  rol: string
}