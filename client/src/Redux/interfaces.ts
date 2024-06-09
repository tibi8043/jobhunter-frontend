import { JobType, RolePayload } from "../Models/enums";

export interface IUser {
  id: string;
  email: string;
  fullname: string;
  role: RolePayload;
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
  fullname: string;
  role: RolePayload;
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

export interface IAllExperienceResponse {
  data: IExperienceResponse[];
  total: number;
  skip: number;
  limit: number;
}

export interface IJobPayload {
  company: string;
  position: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  city: string;
  homeOffice: boolean | number;
}

export interface IJobResponse {
  id: string;
  company: string;
  position: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  city: string;
  homeOffice: boolean | number;
  userId: string;
  createdBy: IUserResponse;
}

export interface IAllJobResponse {
  data: IJobResponse[];
  total: number;
  skip: number;
  limit: number;
}

export interface IFilterPayLoad {
  salaryFrom?: number | null;
  salaryTo?: number | null;
  city?: string | null;
  jobType?: JobType | null;
  homeOffice?: boolean | null;
  searchValue?: string | null;
  userId?: string | null; //companyID
}

export interface IApplyForAJob {
  jobId: number;
}

export interface IApplicantsForAJob {
  jobId: string;
  job: IJobResponse;
  userId: string;
  user: IUserResponse;
}
