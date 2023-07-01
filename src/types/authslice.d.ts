export interface UserData {
  name: string;
  email: string;
  avtar: string;
  role: string;
}
export interface AuthProps {
  token: string;
  userData: UserData;
}
