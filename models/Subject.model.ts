import { plainToInstance } from "class-transformer";

export class Subject {
  public id: number;
  public name: string;
  public numberOfCredits: number;

  constructor(params?: any) {
    return plainToInstance(Subject, params);
  }
}
