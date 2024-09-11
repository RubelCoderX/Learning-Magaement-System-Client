import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import errorMiddleware from "./middleware/error";
import userRouter from "./user/routes/user.route";
import courseRouter from "./course/course.route";
import orderRouter from "./order/order.route";
import notificationRoute from "./notification/notification.route";
import analyticsRouter from "./analytics/analytics.route";
import layoutRouter from "./layout/layout.route";

//body parsers
app.use(express.json({ limit: "50mb" }));
// cookie-parser
app.use(cookieParser());
// cors => corss origin resource sharing
app.use(cors({ origin: config.origin }));

// routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter
);

// testing api
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Learning Management System");
});

app.use(errorMiddleware);

export default app;
