import cloudinary from "cloudinary";
// create layout
import { NextFunction, Request, Response } from "express";
import { LayoutModel } from "./layout.model";
import catchAsync from "../middleware/catchAsync";
import ErrorHandler from "../utils/ErrorHandler";

export const createLayout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      const isTypeExists = await LayoutModel.findOne({ type });
      if (isTypeExists) {
        return res.status(400).json({
          success: false,
          message: `${type} already exists`,
        });
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        // console.log(req.body);
        const { catgories } = req.body;

        const categoriesItem = await Promise.all(
          catgories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          catgories: categoriesItem,
        });
      }
      res.status(200).json({
        success: true,
        message: "Successfully created Layout",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit layout
export const editLayout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData?.image.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }
      if (type === "FAQ") {
        const faqData: any = await LayoutModel.findOne({ type: "FAQ" });
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(
          faqData._id,

          { type: "FAQ", faq: faqItems }
        );
      }
      if (type === "Categories") {
        const categoriesData: any = await LayoutModel.findOne({
          type: "Categories",
        });
        const { catgories } = req.body;
        const categoriesItem = await Promise.all(
          catgories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData._id, {
          type: "Categories",
          catgories: categoriesItem,
        });
      }
      res.status(200).json({
        success: true,
        message: "Successfully updated Layout",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get layout by type
export const getLayout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const layout = await LayoutModel.findOne({ type });
      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
