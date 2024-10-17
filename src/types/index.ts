export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  avatar: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  user: User;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  questionId: number;
  userId: number;
  createdAt: string;
  user: User;
  question: Question;
}
