import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Contact form types and validation
export interface ContactFields {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

interface MailtoSuccess {
  allowed: true;
  href: string;
}

interface MailtoError {
  allowed: false;
  errors?: string[];
}

type MailtoResult = MailtoSuccess | MailtoError;

/**
 * Validates contact form fields and builds a mailto: link
 * Implements honeypot protection and client-side validation
 */
export function buildMailto(fields: ContactFields): MailtoResult {
  // Honeypot check - if filled, it's likely a bot
  if (fields.honeypot && fields.honeypot.trim()) {
    return { allowed: false };
  }

  const errors: string[] = [];

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email)) {
    errors.push('invalid_email');
  }

  // Validate consent
  if (!fields.consent) {
    errors.push('no_consent');
  }

  // Validate message length (minimum 20 characters)
  if (!fields.message || fields.message.trim().length < 20) {
    errors.push('short_message');
  }

  // Validate name is provided
  if (!fields.name || !fields.name.trim()) {
    errors.push('no_name');
  }

  if (errors.length > 0) {
    return { allowed: false, errors };
  }

  // Build mailto link with encoded subject and body
  const subject = encodeURIComponent(`Portfolio Contact — ${fields.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone ?? '-'}`,
      '',
      fields.message
    ].join('\n')
  );

  return {
    allowed: true,
    href: `mailto:lpazzim@gmail.com?subject=${subject}&body=${body}`
  };
}
