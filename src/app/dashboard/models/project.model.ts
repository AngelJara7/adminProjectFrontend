interface _UserProject {
  _id: string,
  nombre: string,
  email: string
}

export class Project {
  constructor(
    public nombre: string,
    public descripcion: string,
    public fecha: Date,
    public _id: string,
    public usuario?: _UserProject,
    public columas?: [],
    public clave?: string
  ) {}
}