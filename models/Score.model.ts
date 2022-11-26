import { Subject } from "./Subject.model";
import { plainToInstance } from "class-transformer";

export class Score {
  public alphabetScore: string;
  public avgScore: string;
  public examScore: string;
  public firstComponentScore: string;
  public secondComponentScore: string;
  public subject: Subject;

  constructor(params?: any) {
    return plainToInstance(Score, params);
  }
}
