interface _UserProject {
  _id: string,
  nombre: string,
  email: string
}

interface _Collaborators {
  _id: string,
  rol: string
}

export class Project {
  constructor(
    public nombre: string,
    public descripcion: string,
    public fecha: Date,
    public _id: string,
    public usuario?: _UserProject,
    public columas?: [],
    public colaboradores?: _Collaborators[],
    public clave?: string
  ) {}
}