export interface User {
  id?: string;
  name: string;
  role?: string;
  email: string;
  password?: string;  // don’t expose this in frontend after auth
}
