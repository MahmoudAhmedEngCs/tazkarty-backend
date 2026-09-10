import twilio from "twilio";
import { PasswordResetNotifier } from "../../domain/services/PasswordResetNotifier";

export class TwilioSmsPasswordResetNotifier
  implements PasswordResetNotifier
{
  private client: twilio.Twilio;

  constructor(
    accountSid: string,
    authToken: string,
    private from: string
  ) {
    this.client = twilio(accountSid, authToken);
  }

 async sendResetCode(
  phoneNumber: string,
  resetToken: string
): Promise<void> {

  const to = `+20${phoneNumber.slice(1)}`;

  await this.client.messages.create({
    body: `Tazkarty: Your password reset code is ${resetToken}`,
    from: this.from,
    to,
  });
}
}