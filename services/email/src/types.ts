interface EmailVerification {
  type: 'emailVerification';
  data: {
    name: string;
    url: string;
  };
}

interface ResetPassword {
  type: 'resetPassword';
  data: {
    name: string;
    url: string;
  };
}

export type MailTemplate = EmailVerification | ResetPassword;

export interface SendMail {
  to: string;
  subject: string;
  template: MailTemplate;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}
