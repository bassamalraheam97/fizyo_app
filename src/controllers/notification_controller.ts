import {
  Get,
  Post,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Delete,
  Path,
  Put,
} from "tsoa";
import { INotifications } from "../types/interfaces";
import { Model } from "mongoose";

const NotificationModel: Model<INotifications> = require("../models/notifications_model");

@Route("notifications")
export default class NotificationController {
  /**
   * Get List of All Notifications
   */
  @Get("/")
  public async getNotifications(): Promise<INotifications[]> {
    return await NotificationModel.find()
      .populate("referenceID")
      .populate("receiverUID");
  }

  /**
   * Get a Notification details
   * @example NotificationId "6313410084cfa62399551059"
   */
  @Response(404, "the requested notification in not found")
  @Get("{notificationId}")
  public async getNotification(
    notificationId: string
  ): Promise<INotifications | null> {
    return await NotificationModel.findById(notificationId)
      .populate("referenceID")
      .populate("receiverUID");
  }

  /**
   * Delete a notification
   * @example notificationId "6313410084cfa62399551059"
   */
  @Response(404, "the requested notification in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{notificationId}")
  public async deleteNotification(notificationId: string) {
    return await NotificationModel.findByIdAndDelete(notificationId);
  }

  /**
   * Create a notification
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<INotifications>({
    referenceType: "Session",
    referenceID: "63131c361ea32f520cb28bd6",
    statues: "opened",
    title: "Warning",
    details: "this notification contain on new details",
    sentDate: new Date("2022-09-10"),
    receivedDate: new Date("2022-09-10"),
    openDate: new Date("2022-09-10"),
    receiverUID: "63130ba28d796320172e58d6",
  })
  @Post("create")
  public async createNotification(
    @Body() notification: INotifications
  ): Promise<INotifications> {
    return new NotificationModel({
      ...notification,
    }).save();
  }

  /**
   * Update a notification
   * @example NotificationId "6313410084cfa62399551059"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{notificationId}")
  public async updateNotification(
    @Path() notificationId: string,
    @Body() notification: Partial<INotifications>
  ): Promise<INotifications | null> {
    let notificationDocument = await NotificationModel.findById(notificationId);
    if (notificationDocument != null) {
      notificationDocument.referenceType =
        notification.referenceType ?? notificationDocument.referenceType;
      notificationDocument.referenceID =
        notification.referenceID ?? notificationDocument.referenceID;
      notificationDocument.statues =
        notification.statues ?? notificationDocument.statues;
      notificationDocument.title =
        notification.title ?? notificationDocument.title;
      notificationDocument.details =
        notification.details ?? notificationDocument.details;

      notificationDocument.sentDate =
        notification.sentDate ?? notificationDocument.sentDate;
      notificationDocument.receivedDate =
        notification.receivedDate ?? notificationDocument.receivedDate;
      notificationDocument.openDate =
        notification.openDate ?? notificationDocument.openDate;
      notificationDocument.receiverUID =
        notification.receiverUID ?? notificationDocument.receiverUID;
      return await notificationDocument.save();
    }
    return null;
  }
}
