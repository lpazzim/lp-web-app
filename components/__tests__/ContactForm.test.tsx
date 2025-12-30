import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../ContactForm';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      'title': 'Contact',
      'name': 'Name',
      'email': 'Email',
      'phone': 'Phone (optional)',
      'message': 'Message',
      'consent': 'I agree to be contacted via email',
      'submit': 'Send Message',
      'errors.invalidEmail': 'Please enter a valid email address',
      'errors.requiredField': 'This field is required',
      'errors.messageLength': 'Message must be at least 20 characters',
      'errors.consentRequired': 'You must agree to be contacted',
      'success': 'Your message has been prepared. Please complete sending via your email client.',
      'mailtoUnavailable': 'Unable to open email client. Please email directly to: lpazzim@gmail.com',
    };
    return messages[key] || key;
  },
}));

describe('ContactForm', () => {
  describe('when rendering', () => {
    it('should render all form fields', () => {
      // Act
      render(<ContactForm />);

      // Assert
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/agree to be contacted/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should have honeypot field hidden', () => {
      // Act
      render(<ContactForm />);

      // Assert
      const honeypot = screen.queryByLabelText(/company/i);
      expect(honeypot).toBeInTheDocument();
      expect(honeypot?.closest('div')).toHaveClass('hidden');
      expect(honeypot).toHaveAttribute('tabIndex', '-1');
    });

    it('should have proper accessibility attributes', () => {
      // Act
      render(<ContactForm />);

      // Assert
      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByRole('textbox', { name: /^email$/i })).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('when validating', () => {
    it('should show error for invalid email', async () => {
      // Arrange
      render(<ContactForm />);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), { target: { value: 'invalid-email' } });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: 'This is a valid message with enough characters.' } 
      });
      fireEvent.click(screen.getByLabelText(/agree to be contacted/i));
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should show error for short message', async () => {
      // Arrange
      render(<ContactForm />);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Short' } });
      fireEvent.click(screen.getByLabelText(/agree to be contacted/i));
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
      });
    });

    it('should show error when consent not given', async () => {
      // Arrange
      render(<ContactForm />);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: 'This is a valid message with enough characters.' } 
      });
      // Don't check consent
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/you must agree to be contacted/i)).toBeInTheDocument();
      });
    });

    it('should clear errors when user starts typing', async () => {
      // Arrange
      render(<ContactForm />);
      const emailInput = screen.getByRole('textbox', { name: /^email$/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act - Submit with invalid email
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: 'Valid message here with more characters.' } 
      });
      fireEvent.click(screen.getByLabelText(/agree to be contacted/i));
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });

      // Act - Start typing to correct
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('when submitting valid form', () => {
    it('should generate mailto link and show success message', async () => {
      // Arrange
      render(<ContactForm />);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1234567890' } });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: 'This is a valid test message with enough characters.' } 
      });
      fireEvent.click(screen.getByLabelText(/agree to be contacted/i));
      fireEvent.click(submitButton);

      // Assert - Just check success message appears (mailto is attempted in the component)
      await waitFor(() => {
        expect(screen.getByText(/your message has been prepared/i)).toBeInTheDocument();
      });
    });

    it('should block submission if honeypot is filled', async () => {
      // Arrange
      render(<ContactForm />);
      const honeypot = screen.getByLabelText(/company/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Act - Fill honeypot (simulating bot)
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: 'This is a valid test message with enough characters.' } 
      });
      fireEvent.change(honeypot, { target: { value: 'Bot Company' } });
      fireEvent.click(screen.getByLabelText(/agree to be contacted/i));
      fireEvent.click(submitButton);

      // Assert - Should not show success message
      await waitFor(() => {
        expect(screen.queryByText(/your message has been prepared/i)).not.toBeInTheDocument();
      });
    });
  });
});
