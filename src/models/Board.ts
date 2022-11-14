import { ICourse } from './Course';
import { IAssignment } from './Assignment';
interface IBoard {
  id: number;
  boardname: string;
  courses: ICourse[];
  assignments: IAssignment[];
}

class Board implements IBoard {
  id: number;
  boardname: string;
  courses: ICourse[];
  assignments: IAssignment[];

  constructor(
    id: number,
    boardname: string,
    courses: ICourse[],
    assignments: IAssignment[],
  ) {
    this.boardname = boardname;
    this.id = id;
    this.courses = courses;
    this.assignments = assignments;
  }
}
export default Board;
