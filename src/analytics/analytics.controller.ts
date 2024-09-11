import { NextFunction, Request, Response } from "express";
import catchAsync from "../middleware/catchAsync";
import { generateLast12MonthsDate } from "../utils/analytics.generator";
import User from "../user/models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CourseModel } from "../course/course.model";
import { OrderModel } from "../order/order.model";

// get users analytics ---only admin can access
export const getUserAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsDate(User);
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// get courses analytics ---only admin can access
export const getCoursesAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsDate(CourseModel);
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// get orders analytics ---only admin can access
export const getOrdersAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsDate(OrderModel);
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
