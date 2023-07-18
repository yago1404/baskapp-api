export class CreateUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public height: number,
    public weight: number,
    public wingspan: number,
    public rule: number,
    public birthday: Date,
  ) {}
}
