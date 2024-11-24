import { generateId } from "../utilities/idGenerator";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createUserModel = (firstName: string, lastName: string, age: number): User => {
  return {
    id: generateId(),
    firstName,
    lastName,
    age,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
