import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

// Mock i18n config
jest.mock('@/i18n', () => ({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Globe: () => <div data-testid="globe-icon">Globe Icon</div>,
}));

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();
  let cookieStore: string = '';
  
  beforeEach(() => {
    jest.clearAllMocks();
    cookieStore = '';
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    
    // Mock document.cookie with getter/setter
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => cookieStore,
      set: (value: string) => {
        cookieStore = value;
      },
    });
    
    // Mock localStorage
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    const localStorageMock = {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: localStorageMock,
    });
  });

  describe('Rendering', () => {
    it('should render language selector with EN and PT buttons', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      // When
      render(<LanguageSwitcher />);

      // Then
      expect(screen.getByRole('group', { name: /language selector/i })).toBeInTheDocument();
      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('PT')).toBeInTheDocument();
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
    });

    it('should mark current locale button as pressed', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('pt');
      (usePathname as jest.Mock).mockReturnValue('/pt');

      // When
      render(<LanguageSwitcher />);

      // Then
      const enButton = screen.getByText('EN');
      const ptButton = screen.getByText('PT');
      
      expect(enButton).toHaveAttribute('aria-pressed', 'false');
      expect(ptButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should apply correct styles to active locale', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      // When
      render(<LanguageSwitcher />);

      // Then
      const enButton = screen.getByText('EN');
      expect(enButton).toHaveClass('bg-zinc-900');
    });
  });

  describe('Locale Switching', () => {
    it('should switch from EN to PT correctly', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/pt');
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it('should switch from PT to EN correctly', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('pt');
      (usePathname as jest.Mock).mockReturnValue('/pt');

      render(<LanguageSwitcher />);

      // When
      const enButton = screen.getByText('EN');
      fireEvent.click(enButton);

      // Then
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/en');
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it('should preserve path when switching locales', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en/projects');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/pt/projects');
      });
    });

    it('should handle nested paths correctly', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en/projects/web-app');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/pt/projects/web-app');
      });
    });

    it('should not navigate when clicking current locale', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const enButton = screen.getByText('EN');
      fireEvent.click(enButton);

      // Then
      expect(mockPush).not.toHaveBeenCalled();
      expect(mockRefresh).not.toHaveBeenCalled();
    });
  });

  describe('Cookie Management', () => {
    it('should set cookie when switching locale', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(cookieStore).toContain('NEXT_LOCALE=pt');
      });
    });

    it('should set cookie with correct max-age', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then - max-age should be 1 year (365 days)
      await waitFor(() => {
        expect(cookieStore).toContain('max-age=31536000'); // 365 * 24 * 60 * 60
      });
    });
  });

  describe('LocalStorage Management', () => {
    it('should update localStorage when switching locale', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(mockSetItem).toHaveBeenCalledWith('locale', 'pt');
      });
    });

    it('should handle localStorage errors gracefully', async () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');
      
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      mockSetItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      fireEvent.click(ptButton);

      // Then
      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'localStorage not available:',
          expect.any(Error)
        );
        // Should still navigate despite localStorage error
        expect(mockPush).toHaveBeenCalledWith('/pt');
      });

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      // When
      render(<LanguageSwitcher />);

      // Then
      const group = screen.getByRole('group', { name: /language selector/i });
      expect(group).toBeInTheDocument();
    });

    it('should have proper aria-pressed states', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      // When
      render(<LanguageSwitcher />);

      // Then
      const enButton = screen.getByText('EN');
      const ptButton = screen.getByText('PT');
      
      expect(enButton).toHaveAttribute('aria-pressed', 'true');
      expect(ptButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should be keyboard accessible', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      render(<LanguageSwitcher />);

      // When
      const ptButton = screen.getByText('PT');
      ptButton.focus();

      // Then
      expect(ptButton).toHaveFocus();
    });

    it('should have visible focus styles', () => {
      // Given
      (useLocale as jest.Mock).mockReturnValue('en');
      (usePathname as jest.Mock).mockReturnValue('/en');

      // When
      render(<LanguageSwitcher />);

      // Then
      const enButton = screen.getByText('EN');
      expect(enButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });
});
