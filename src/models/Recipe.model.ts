export class Recipe {
  constructor(
    public id: string,
    public email: string,
    public displayName: string,
    public photoURL: string,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}
