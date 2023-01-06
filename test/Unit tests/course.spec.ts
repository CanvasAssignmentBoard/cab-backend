import { Test, TestingModule } from '@nestjs/testing';
import Course from '../../src/models/Course';
import CourseLogic from '../../src/Logic/CourseLogic';
import ICourseLogic from '../../src/Logic/ICourseLogic';
import MockCanvas from '../Mock/MockCanvas';
describe('Course Logic', () => {
  let logic: ICourseLogic;

  beforeEach(async () => {
    logic = new CourseLogic(new MockCanvas())
  });


    it('should return all courses', async () => {
      const courses: Course[] = [];
      courses.push(new Course(123, 'CourseName'));
      expect(await logic.GetCourses()).toStrictEqual(courses);
    });

});
