
export class User {
  constructor(
    public nombre: string,
    public email: string,
    public _id: string,
    public token?: string,
    public password?: string,
    public verificada?: boolean,
    public foto?: string
  ) {}
}