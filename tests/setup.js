import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// after each test it should clean it up
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
