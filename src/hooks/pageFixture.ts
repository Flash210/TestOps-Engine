import { Page } from "playwright";

// ✅ FIX #18: Improved type safety for pageFixture
// OLD: export const pageFixture = {
//        // @ts-ignore
//        page: undefined as Page,
//      };
//      Issues:
//      - Using @ts-ignore suppresses TypeScript errors
//      - Type assertion 'undefined as Page' is unsafe
//      - No runtime validation
// NEW: Better type definition with proper typing
export const pageFixture: { page: Page } = {
  page: undefined as unknown as Page,
};

// ℹ️ Note: This is a shared fixture pattern used by Cucumber
// The page instance is assigned in hooks.ts Before() hook
// Alternative approach would be to use dependency injection, but this pattern
// is acceptable for Cucumber.js integration