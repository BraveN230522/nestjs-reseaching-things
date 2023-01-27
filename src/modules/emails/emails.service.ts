import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

// import { WEB_BASE_USER_URL } from 'src/environments';
// import { IToken } from 'src/interfaces';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  private async sendEmailViaSMTP(options: ISendMailOptions) {
    try {
      await this.mailerService.sendMail(options);
      return { success: true, email: String(options.to) };
    } catch (error) {
      throw error;
    }
  }

  async sendVerifyEmail(verificationCode: string | number, toEmail: string, fullName: string) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: 'Silverhorn - Verification Email',
      template: 'reset-password',
      context: {
        email: toEmail,
        verificationCode,
        fullName,
        // url: WEB_BASE_USER_URL
      },
    });
  }

  async sendTemporaryAccessDeal(token: any, toEmail: string) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: 'Silverhorn - Temporary Access Deal',
      template: 'temporary-access',
      context: {
        email: toEmail,
        token,
        // url: WEB_BASE_USER_URL,
      },
    });
  }

  async sendResponseKYC(toEmail: string, fullName: string, message: string) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - ${message}`,
      template: 'kyc-response',
      context: {
        email: toEmail,
        fullName,
        message,
        // url: WEB_BASE_USER_URL,
      },
    });
  }

  async sendInvestmentConfirmation(
    toEmail: string,
    subscribed_amount: number,
    dealName: string,
    fullName: string,
  ) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - You have subscribed to Deal`,
      template: 'subscribe-deal',
      context: {
        fullName,
        email: toEmail,
        subscribed_amount: subscribed_amount.toLocaleString(),
        dealName,
        // url: WEB_BASE_USER_URL,
      },
    });
  }

  async sendInvestmentConfirmationAdmin(
    toEmail: string,
    subscribed_amount: number,
    dealName: string,
    adminName: string,
    clientName: string,
  ) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - You have subscribed to Deal`,
      template: 'subscribe-deal-admin',
      context: {
        adminName,
        email: toEmail,
        subscribed_amount: subscribed_amount.toLocaleString(),
        dealName,
        // url: WEB_BASE_USER_URL,
        clientName,
      },
    });
  }

  async sendInvesterChangeInfo(
    toEmail: string,
    admin_name: string,
    client_name: string,
    email: string,
    country_code: string,
    city: string,
    phone_number: string,
  ) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - Investor has changed their account information`,
      template: 'invester-change-info',
      context: {
        admin_name,
        email: toEmail,
        user_email: email,
        client_name,
        country_code,
        city,
        phone_number,
        // url: WEB_BASE_USER_URL,
      },
    });
  }

  async sendChangeDealSubcription(
    toEmail: string,
    subscribed_amount: number,
    oldDealName: string,
    newDealName: string,
    fullName: string,
  ) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - Your deal has been changed`,
      template: 'change-deal',
      context: {
        fullName,
        email: toEmail,
        subscribed_amount: subscribed_amount.toLocaleString(),
        oldDealName,
        newDealName,
        // url: WEB_BASE_USER_URL,
      },
    });
  }

  async sendChangeSubcriptionStatus(
    toEmail: string,
    subscribed_amount: number,
    oldStatus: string,
    status: string,
    dealName: string,
    fullName: string,
  ) {
    return this.sendEmailViaSMTP({
      to: toEmail,
      subject: `Silverhorn - Your status subscription has been changed`,
      template: 'change-subscription-status',
      context: {
        fullName,
        email: toEmail,
        subscribed_amount: subscribed_amount.toLocaleString(),
        oldStatus,
        status,
        dealName,
        // url: WEB_BASE_USER_URL,
      },
    });
  }
}
