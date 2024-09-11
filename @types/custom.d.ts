import { Request } from "express";
import { IUser } from "../src/user/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
