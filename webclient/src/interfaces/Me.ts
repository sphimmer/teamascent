export interface Me {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  biography: string;
  createdDate: string;
}

export interface MeResult {
  me: Me;
}
