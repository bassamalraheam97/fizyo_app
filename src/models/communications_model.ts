import { Schema, model } from "mongoose";
import { ICommunications } from "../types/interfaces";

const CommunicationsSchema = new Schema<ICommunications>({
  referenceType: {
    type: String,
    required: true,
    enum: ["Agreement", "Session", "Dispute", "User"],
    default: "Session",
  },
  referenceID: { type: Schema.Types.ObjectId, refPath: "referenceType" },
  partiesUIDs: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // partiesUIDs: [{ type: String }],
  lastUpdate: { type: Date, required: true },
  messages: [
    {
      type: {
        messageType: { type: String, required: true },
        messageContent: { type: String, required: true },
        senderUID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // senderUID: { type: String, required: true },
        sendDate: { type: Date, required: true },
        deliveryDetails: [{ type: Object, required: true }],
      },
      required: true,
    },
  ],
});
CommunicationsSchema.virtual("url").get(function () {
  return "communications/" + this._id;
});

module.exports = model<ICommunications>("Communication", CommunicationsSchema);
