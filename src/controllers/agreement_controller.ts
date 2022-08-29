import {
  Get,
  Post,
  Delete,
  Put,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Path,
} from 'tsoa';
import { Model } from 'mongoose';
import { IAgreements } from '../types/interfaces';

const AgreementsModel: Model<IAgreements> = require('../models/agreements_model');

@Route('agreements')
export default class AgreementsController {
  /**
   * Get List of All agreements
   */
  @Get('/')
  public async getAgreements(): Promise<IAgreements[]> {
    return await AgreementsModel.find();
  }

  /**
   * Get a agreement details
   * @example agreementId "_"
   */
  @Response(404, 'The requested agreement is not found')
  @Get('{agreementId}')
  public async getAgreement(agreementId: string): Promise<IAgreements | null> {
    return AgreementsModel.findById(agreementId);
  }

  /**
   * Delete a agreement
   * @example agreementId "_"
   */
  @Response(404, 'The requested agreement is not found')
  @SuccessResponse('200', 'Deleted')
  @Delete('{agreementId}')
  public async deleteAgreement(
    agreementId: string
  ): Promise<IAgreements | null> {
    return AgreementsModel.findByIdAndDelete(agreementId);
  }

  /**
   * Create a agreement
   */
  @Response(422, 'Validation Failed')
  @SuccessResponse('200', 'Created')
  @Example<IAgreements>({
    name: 'Ahmad',
    parties: ['certificate'],
    startDate: new Date('2022-09-10'),
    endDate: new Date('2022-09-10'),
    details: 'first Agreement',
    attachments: [{ name: 'personal information' }],
    reminder: true,
  })
  @Post('create')
  public async createAgreement(
    @Body() agreement: IAgreements
  ): Promise<IAgreements> {
    return new AgreementsModel({ ...agreement }).save();
  }

  /**
   * Update a agreement
   */
  @Response(422, 'Validation Failed')
  @SuccessResponse('200', 'Updated')
  @Put('update/{agreementId}')
  public async updateAgreement(
    @Path() agreementId: string,
    @Body() agreement: Partial<IAgreements>
  ): Promise<IAgreements | null> {
    let agreementDocument = await AgreementsModel.findById(agreementId);
    if (agreementDocument != null) {
      agreementDocument.name = agreement.name ?? agreementDocument.name;
      agreementDocument.parties =
        agreement.parties ?? agreementDocument.parties;
      agreementDocument.startDate =
        agreement.startDate ?? agreementDocument.startDate;
      agreementDocument.endDate =
        agreement.endDate ?? agreementDocument.endDate;
      agreementDocument.details =
        agreement.details ?? agreementDocument.details;
      agreementDocument.attachments =
        agreement.attachments ?? agreementDocument.attachments;
      agreementDocument.reminder =
        agreement.reminder ?? agreementDocument.reminder;

      return await agreementDocument.save();
    }
    return null;
  }
}
