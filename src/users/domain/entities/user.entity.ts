export class User {
  id?: string;
  password: string;
  email: string;
  refreshToken?: string;

  constructor({
    id,
    password,
    email,
    refreshToken,
  }: {
    id?: string;
    password: string;
    email: string;
    refreshToken?: string;
  }) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.refreshToken = refreshToken;
  }
}
