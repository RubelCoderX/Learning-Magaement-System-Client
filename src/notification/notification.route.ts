import { isAuthenticated } from "./../middleware/auth";
import express from "express";
import { authorizedRoles } from "../middleware/auth";
import {
  getNotifications,
  updateNotificationStatus,
} from "./notification.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notification",
  isAuthenticated,
  authorizedRoles("admin"),
  getNotifications
);
notificationRoute.put(
  "/update-notification-status/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateNotificationStatus
);
export default notificationRoute;
