export type UserType = 'admin' | 'collaborator' | 'visitor';

export interface User {
  name: string;
  password: string;
  type: UserType;
}
