import ICanvas from "src/canvas/ICanvas";
import ICourseLogic from "./ICourseLogic";

class CourseLogic implements ICourseLogic{
    constructor(private readonly canvasService : ICanvas){
    }

    async GetCourses(){
        return await this.canvasService.GetCourses();
     }
} export default CourseLogic;