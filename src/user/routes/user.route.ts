import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../Controllers/user.controller";
import { authorizedRoles, isAuthenticated } from "../../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);
userRouter.get(
  "/get-all-user",
  isAuthenticated,
  authorizedRoles("admin"),
  getAllUser
);
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizedRoles("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteUser
);

export default userRouter;
