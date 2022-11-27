import { Score } from "./Score.model";
import { plainToInstance } from "class-transformer";

export class Student {
  public id: string;
  public name: string;
  public scores: Score[];
  public class: string;
  public avgScore: string;
  public failedSubjects: number;
  public passedSubjects: number;

  constructor(params?: any) {
    return plainToInstance(Student, params);
  }
}
