import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R, T = Record<string, unknown>> {
      toHaveClass(className: string): R;
    }
  }
}
