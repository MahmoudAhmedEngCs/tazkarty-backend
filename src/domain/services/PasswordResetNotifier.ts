export interface PasswordResetNotifier {
  sendResetCode(
    phoneNumber: string,
    resetToken: string
  ): Promise<void>;
}