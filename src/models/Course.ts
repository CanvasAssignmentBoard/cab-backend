export interface ICourse {
  id: number;
  name: string;
}

class Course implements ICourse {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.name = name;
    this.id = id;
  }
}
export default Course;
