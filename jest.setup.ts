import '@testing-library/jest-dom';

// Polyfill ResizeObserver for tests
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.location.href for mailto tests
delete (window as any).location;
(window as any).location = { href: '' };
