import { PopulatedDoc, Document, Types } from "mongoose";
import internal from "stream";
export interface ISessions {
  _id?: Types.ObjectId | string;
  sessionType:'group'|'individual'; //enum
  serviceProvidersID?: string | Types.ObjectId | IserviceProviders;
  clientsIDs?: string[] | Types.ObjectId[] |IClients[];
  name: string;
  details: string;
  startDate: Date;
  duration:number;
  serviceType:'Online'| 'Home'|'Office'; //enum
  location:Object;
  attachments:{ attachmentUrl:string,attachmentName:string,attachmentType:string };
  requirements:string;
  ratings?:{raterUID:string|Types.ObjectId|IUsers
          ratingValue:string,
          ratingDate:Date
  }[] | object[];
  reviews?:{reviewerUID:string|Types.ObjectId|IUsers
    reviewDetails:string,
    reviewDate:Date
}[] | object[];
  sessionFee:number;
  payments?:{
    discount:number,
    paymentMethod:string,
    payerID:string|Types.ObjectId,
    amount:number;
  }|object;
  status:'initiated'|'agreed'|'canceled'|'finished';//enum
  doctorReferral:string;
}

export interface IAnnouncements{
_id ?: Types.ObjectId|string;
referenceType?:'Session'|'Advertisment';//enum
referenceID?:string|null;
statues: string|'draft'|'published';//enum
topic:string;
details:string;
sentDate:Date;
attachments:object[]|string;
receiversUIDs?:string[]|Types.ObjectId[]|IUsers[];

}
export interface IAlarms{
    _id?:string|Types.ObjectId;
    name:string;
    referenceType:string|'agreements'|'sessions'|'disputes'|'services providers';//enum
    referenceID?:string
    frequencyUnit:string|'Days'|'Hours';//enum
    frequency:number;
    active:boolean;
    startDate:Date;
    endDate:Date;

}
export interface INotifications{
_id?: Types.ObjectId|string;
referenceType:string|'sessions'|'agreements'|'disputes'|'alarm'|'announcements'|'users'|'communications';//enum
referenceID:string;
statues:string|'sent'|'delivered'|'opened';//enum
title:string;
details: string;
sentDate:Date;
receivedDate:Date;
openDate:Date;
receiverUID:string|Types.ObjectId|IUsers;
}

export interface IEnumValues{

    _id?:Types.ObjectId|string;
    enumName:string;
    enumValues:string[];
    enumNote:string;
}
