// Mock next-intl for tests
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const messages: Record<string, any> = {
      contact: {
        title: 'Contact',
        name: 'Name',
        email: 'Email',
        phone: 'Phone (optional)',
        message: 'Message',
        consent: 'I agree to be contacted via email',
        submit: 'Send Message',
        errors: {
          invalidEmail: 'Please enter a valid email address',
          requiredField: 'This field is required',
          messageLength: 'Message must be at least 20 characters',
          consentRequired: 'You must agree to be contacted',
        },
        success: 'Your message has been prepared. Please complete sending via your email client.',
        mailtoUnavailable: 'Unable to open email client. Please email directly to: lpazzim@gmail.com',
      },
      footer: {
        connect: 'Connect with me',
        rights: 'All rights reserved',
      },
    };
    return (key: string) => {
      const keys = key.split('.');
      let value: any = messages[namespace];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));
