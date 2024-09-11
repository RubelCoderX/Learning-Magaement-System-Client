import { Response } from "express";
import catchAsync from "../middleware/catchAsync";
import { CourseModel } from "./course.model";

// create course
export const createCourse = catchAsync(async (data: any, res: Response) => {
  const course = await CourseModel.create(data);
  res.status(201).json({
    success: true,
    course,
  });
});
// Get All Course
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    courses,
  });
};
