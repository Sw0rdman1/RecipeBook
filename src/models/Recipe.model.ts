export class Recipe {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public ingredients: string,
    public instructions: string,
    public photoURL: string,
    public likes: number,
    public likedByUser: boolean,
    public creatorID: string,
    public creatorName: string
  ) {}
}
