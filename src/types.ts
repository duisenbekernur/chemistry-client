export interface ICourse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  isAdmin: boolean;
  name: string;
  password: string;
  iat: number;
  exp: number;
}

export interface IVideo {
  id: number;
  link: string;
  name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  courseId: number;
}
