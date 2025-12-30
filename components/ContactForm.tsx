'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { buildMailto, type ContactFields } from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contact');
  
  const [formData, setFormData] = useState<ContactFields>({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    honeypot: '', // Hidden field for bot detection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (field: keyof ContactFields, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFeedback(null);

    const result = buildMailto(formData);

    if (!result.allowed) {
      if (result.errors) {
        const newErrors: Record<string, string> = {};
        result.errors.forEach(error => {
          switch (error) {
            case 'invalid_email':
              newErrors.email = t('errors.invalidEmail');
              break;
            case 'no_name':
              newErrors.name = t('errors.requiredField');
              break;
            case 'short_message':
              newErrors.message = t('errors.messageLength');
              break;
            case 'no_consent':
              newErrors.consent = t('errors.consentRequired');
              break;
          }
        });
        setErrors(newErrors);
      }
      return;
    }

    // Try to open mailto link
    try {
      window.location.href = result.href;
      setFeedback({ type: 'success', message: t('success') });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          consent: false,
          honeypot: '',
        });
        setFeedback(null);
      }, 3000);
    } catch (error) {
      setFeedback({ type: 'error', message: t('mailtoUnavailable') });
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/50" aria-labelledby="contact-heading">
      <div className="max-w-2xl mx-auto">
        <h2 id="contact-heading" className="text-3xl font-bold mb-8 text-center text-zinc-100">
          {t('title')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-800/50 p-8 rounded-lg border border-zinc-700" noValidate>
          {/* Honeypot field - hidden from users */}
          <div className="hidden" aria-hidden="true">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot || ''}
              onChange={(e) => handleChange('honeypot', e.target.value)}
            />
          </div>

          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="required text-zinc-200">
              {t('name')}
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'border-red-500 bg-zinc-900 text-zinc-100' : 'bg-zinc-900 text-zinc-100 border-zinc-600'}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-400" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="required text-zinc-200">
              {t('email')}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-red-500 bg-zinc-900 text-zinc-100' : 'bg-zinc-900 text-zinc-100 border-zinc-600'}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone field (optional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-200">{t('phone')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-zinc-900 text-zinc-100 border-zinc-600"
            />
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="required text-zinc-200">
              {t('message')}
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={errors.message ? 'border-red-500 bg-zinc-900 text-zinc-100' : 'bg-zinc-900 text-zinc-100 border-zinc-600'}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-400" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Consent checkbox (LGPD/GDPR) */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleChange('consent', checked === true)}
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              className={errors.consent ? 'border-red-500' : 'border-zinc-600'}
            />
            <div className="space-y-1">
              <Label htmlFor="consent" className="font-normal cursor-pointer text-zinc-300">
                {t('consent')}
              </Label>
              {errors.consent && (
                <p id="consent-error" className="text-sm text-red-400" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full" size="lg">
            {t('submit')}
          </Button>

          {/* Feedback messages */}
          {feedback && (
            <div
              role="status"
              aria-live="polite"
              className={`p-4 rounded-md ${
                feedback.type === 'success'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
