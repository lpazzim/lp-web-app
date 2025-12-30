import { buildMailto, type ContactFields } from '../utils';

describe('buildMailto', () => {
  // Arrange - Valid contact data
  const validContact: ContactFields = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'This is a test message with more than 20 characters.',
    consent: true,
    honeypot: '',
  };

  describe('when validating contact fields', () => {
    it('should return mailto link for valid contact data', () => {
      // Act
      const result = buildMailto(validContact);

      // Assert
      expect(result.allowed).toBe(true);
      if (result.allowed) {
        expect(result.href).toContain('mailto:lpazzim@gmail.com');
        expect(result.href).toContain('subject=');
        expect(result.href).toContain('body=');
      }
    });

    it('should reject when honeypot is filled', () => {
      // Arrange
      const contactWithHoneypot = { ...validContact, honeypot: 'bot-filled' };

      // Act
      const result = buildMailto(contactWithHoneypot);

      // Assert
      expect(result.allowed).toBe(false);
    });

    it('should reject invalid email format', () => {
      // Arrange
      const invalidEmail = { ...validContact, email: 'invalid-email' };

      // Act
      const result = buildMailto(invalidEmail);

      // Assert
      expect(result.allowed).toBe(false);
      if (!result.allowed) {
        expect(result.errors).toContain('invalid_email');
      }
    });

    it('should reject when name is empty', () => {
      // Arrange
      const noName = { ...validContact, name: '' };

      // Act
      const result = buildMailto(noName);

      // Assert
      expect(result.allowed).toBe(false);
      if (!result.allowed) {
        expect(result.errors).toContain('no_name');
      }
    });

    it('should reject when message is too short', () => {
      // Arrange
      const shortMessage = { ...validContact, message: 'Short' };

      // Act
      const result = buildMailto(shortMessage);

      // Assert
      expect(result.allowed).toBe(false);
      if (!result.allowed) {
        expect(result.errors).toContain('short_message');
      }
    });

    it('should reject when consent is not given', () => {
      // Arrange
      const noConsent = { ...validContact, consent: false };

      // Act
      const result = buildMailto(noConsent);

      // Assert
      expect(result.allowed).toBe(false);
      if (!result.allowed) {
        expect(result.errors).toContain('no_consent');
      }
    });

    it('should encode special characters in subject and body', () => {
      // Arrange
      const specialChars = {
        ...validContact,
        name: 'José & María',
        message: 'Test message with special chars: @#$%^&*() and émojis 🎉',
      };

      // Act
      const result = buildMailto(specialChars);

      // Assert
      expect(result.allowed).toBe(true);
      if (result.allowed) {
        // Subject and body should be URI encoded
        expect(result.href).toContain('subject=Portfolio%20Contact');
        expect(result.href).toContain('body=');
        // The & in query string is expected, but special chars in content should be encoded
        const decodedHref = decodeURIComponent(result.href);
        expect(decodedHref).toContain('José & María');
        expect(decodedHref).toContain('@#$%^&*()');
      }
    });

    it('should handle optional phone field', () => {
      // Arrange - with phone
      const withPhone = { ...validContact, phone: '+1234567890' };
      // Arrange - without phone
      const withoutPhone = { ...validContact, phone: undefined };

      // Act
      const resultWith = buildMailto(withPhone);
      const resultWithout = buildMailto(withoutPhone);

      // Assert
      expect(resultWith.allowed).toBe(true);
      expect(resultWithout.allowed).toBe(true);
      if (resultWithout.allowed) {
        // Should use '-' as placeholder when phone is not provided
        expect(decodeURIComponent(resultWithout.href)).toContain('Phone: -');
      }
    });

    it('should include all fields in the mailto body', () => {
      // Act
      const result = buildMailto(validContact);

      // Assert
      expect(result.allowed).toBe(true);
      if (result.allowed) {
        const decodedHref = decodeURIComponent(result.href);
        expect(decodedHref).toContain(`Name: ${validContact.name}`);
        expect(decodedHref).toContain(`Email: ${validContact.email}`);
        expect(decodedHref).toContain(`Phone: ${validContact.phone}`);
        expect(decodedHref).toContain(validContact.message);
      }
    });

    it('should return multiple errors when multiple fields are invalid', () => {
      // Arrange
      const multipleErrors = {
        name: '',
        email: 'bad-email',
        message: 'short',
        consent: false,
        honeypot: '',
      };

      // Act
      const result = buildMailto(multipleErrors);

      // Assert
      expect(result.allowed).toBe(false);
      if (!result.allowed && result.errors) {
        expect(result.errors.length).toBeGreaterThan(1);
        expect(result.errors).toContain('no_name');
        expect(result.errors).toContain('invalid_email');
        expect(result.errors).toContain('short_message');
        expect(result.errors).toContain('no_consent');
      }
    });
  });
});
