import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}
const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
