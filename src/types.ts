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
  createdAt: string;
  updatedAt: string;
  courseId: number;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: string[];
  createdAt: string;
  updatedAt: string;
  videoId: number;
  answerIds: number[];
}

interface IChosenOptions {
  chosenOptions: number;
}

export interface IPassedQuestion {
  id: number;
  userId: number;
  videoId: number;
  userAnswers: IChosenOptions[];
  createdAt: string;
  updatedAt: string;
  answerIds: number[];
  question: string;
  answers: string[];
  videoName: string
}
