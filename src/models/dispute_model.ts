import { Schema, model } from "mongoose";
import { IDisputes } from "../types/interfaces";

const DisputeSchema = new Schema<IDisputes>({
  // sessionID: { type: Schema.Types.ObjectId, ref: 'Session' },
  // firstPartyUID: { type: Schema.Types.ObjectId, ref: 'User' },
  // secondUID: { type: Schema.Types.ObjectId, ref: 'User' },
  sessionID: { type: String },
  firstPartyUID: { type: String },
  secondUID: { type: String },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  attachments: [
    {
      type: {
        url: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    },
  ], // name, url, type
  status: {
    type: String,
    required: true,
    enum: [
      "sent",
      "received",
      "in-progress",
      "suspended",
      "rejected",
      "resolved",
    ],
    default: "sent",
  },

  // resolverUID: { type: Schema.Types.ObjectId, ref: 'User' },
  resolverUID: { type: String },
  inProgressDate: { type: Date, required: true },
  receivedDate: { type: Date, required: true },
  suspendedDate: { type: Date, required: true },
  closedDate: { type: Date, required: true },
});

DisputeSchema.virtual("url").get(function () {
  return "disputes/" + this._id;
});

module.exports = model<IDisputes>("Dispute", DisputeSchema);