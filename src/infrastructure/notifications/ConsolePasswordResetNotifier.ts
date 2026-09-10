import { PasswordResetNotifier } from "../../domain/services/PasswordResetNotifier";

export class ConsolePasswordResetNotifier
  implements PasswordResetNotifier
{
  async sendResetCode(
    phoneNumber: string,
    resetToken: string
  ): Promise<void> {
    console.log(
      `[DEV SMS] To: ${phoneNumber} | Reset Token: ${resetToken}`
    );
  }
}