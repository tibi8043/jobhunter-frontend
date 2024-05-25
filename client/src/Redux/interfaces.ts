import { Role, RolePayload } from "../Models/enums";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
}

export interface IExperience {
  company: string;
  title: string;
  interval: string;
}

export interface IExperiencePayload {
  company: string;
  title: string;
  interval: string;
}

export interface IExperienceResponse {
  id: string;
  company: string;
  title: string;
  interval: string;
  userId: string;
  user: IUserResponse;
}

export interface IUserPayload {
  email: string;
  password: string;
  fullname: string;
  role: RolePayload;
}

export interface IUserResponse {
  email: string;
  id: string;
  fullName: string;
  role: Role;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUserResponse;
}

export interface ILoginPayload {
  email: string;
  password: string;
  strategy: "local";
}
