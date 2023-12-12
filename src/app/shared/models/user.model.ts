
export class User {
  constructor(
    public _id: string,
    public nombre: string,
    public email: string,
    public password?: string,
    public token?: string,
    public verificada?: boolean,
    public foto?: string
  ) {}
}