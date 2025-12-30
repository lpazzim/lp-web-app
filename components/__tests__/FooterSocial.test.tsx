import { render, screen } from '@testing-library/react';
import { FooterSocial } from '../FooterSocial';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      'connect': 'Connect with me',
      'rights': 'All rights reserved',
    };
    return messages[key] || key;
  },
}));

describe('FooterSocial', () => {
  describe('when rendering', () => {
    it('should render footer with role contentinfo', () => {
      // Act
      render(<FooterSocial />);

      // Assert
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should display all social links', () => {
      // Act
      render(<FooterSocial />);

      // Assert
      expect(screen.getByLabelText(/visit lucas pazzim on linkedin/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/visit lucas pazzim on github/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/visit lucas pazzim on instagram/i)).toBeInTheDocument();
    });

    it('should have proper accessibility attributes on links', () => {
      // Act
      render(<FooterSocial />);

      // Assert
      const linkedInLink = screen.getByLabelText(/visit lucas pazzim on linkedin/i);
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/lucas-pazzim/');
      expect(linkedInLink).toHaveAttribute('target', '_blank');
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');

      const githubLink = screen.getByLabelText(/visit lucas pazzim on github/i);
      expect(githubLink).toHaveAttribute('href', 'https://github.com/lpazzim');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

      const instagramLink = screen.getByLabelText(/visit lucas pazzim on instagram/i);
      expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/lpazzim/');
      expect(instagramLink).toHaveAttribute('target', '_blank');
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should display current year in copyright', () => {
      // Arrange
      const currentYear = new Date().getFullYear();

      // Act
      render(<FooterSocial />);

      // Assert
      expect(screen.getByText(new RegExp(`© ${currentYear}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(/lucas pazzim/i)).toBeInTheDocument();
      expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    });

    it('should have navigation landmark for social links', () => {
      // Act
      render(<FooterSocial />);

      // Assert
      const socialNav = screen.getByRole('navigation', { name: /social media links/i });
      expect(socialNav).toBeInTheDocument();
    });

    it('should render icons with aria-hidden', () => {
      // Act
      const { container } = render(<FooterSocial />);

      // Assert
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBe(3); // LinkedIn, GitHub, Instagram
    });
  });
});
