import ICourse from "./ICourse"

class Course implements ICourse{
    id: number;
    name: string;
    constructor(id:number,name:string){
        this.id = id;
        this.name = name;
    }
} export default Course;