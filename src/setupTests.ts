import '@testing-library/jest-dom/vitest'

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// jsdom doesn't implement ResizeObserver, which Recharts' ResponsiveContainer needs.
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver
