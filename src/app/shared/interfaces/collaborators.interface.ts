import { UserProject } from ".";

enum Rol {
  creador = 'creador',
  admin = 'admin',
  colaborador = 'colaborador'
}

export interface Collaborators {
  usuario: UserProject,
  // _id: string,
  // nombre: string,
  // email: string,
  // foto: string,
  rol: string
}