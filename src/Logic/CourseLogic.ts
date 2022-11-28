import Canvas from "src/canvas/canvas";
import ICourseLogic from "./ICourseLogic";

class CourseLogic implements ICourseLogic{
    constructor(private readonly canvasService : Canvas){
    }

    async GetCourses(){
        return await this.canvasService.GetCourses();
     }
} export default CourseLogic;