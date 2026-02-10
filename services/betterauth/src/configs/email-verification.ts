import EmailService from '@services/email';
import { BetterAuthOptions } from 'better-auth';

export function createEmailVerificationConfig(
  emailService: EmailService,
): BetterAuthOptions['emailVerification'] {
  return {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail(data) {
      await emailService.sendEmail({
        to: data.user.email,
        subject: 'Verify your email',
        template: {
          type: 'emailVerification',
          data: {
            url: data.url,
            name: data.user.name,
          },
        },
      });
    },
  };
}
