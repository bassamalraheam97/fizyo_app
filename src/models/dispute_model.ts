import { Schema, model } from 'mongoose';
import { IDispute } from '../types/interfaces';

const DisputeSchema = new Schema<IDispute>({
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
      type: Object({
        url: { type: String },
        name: { type: String },
        type: { type: String },
      }),
    },
  ], // name, url, type
  status: {
    type: String,
    required: true,
    enum: [
      'sent',
      'received',
      'in-progress',
      'suspended',
      'rejected',
      'resolved',
    ],
    default: 'sent',
  },

  // resolverUID: { type: Schema.Types.ObjectId, ref: 'User' },
  resolverUID: { type: String },
  inProgressDate: { type: Date, required: true },
  receivedDate: { type: Date, required: true },
  suspendedDate: { type: Date, required: true },
  closedDate: { type: Date, required: true },
});

DisputeSchema.virtual('url').get(function () {
  return 'disputes/' + this._id;
});

module.exports = model<IDispute>('Dispute', DisputeSchema);
