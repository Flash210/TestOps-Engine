// Common selectors shared across multiple pages
export const commonSelectors = {
  // Navigation
  homeButton: 'a[href="/"]',
  logo: ".header-logo",

  // Common buttons
  submitButton: 'button[type="submit"]',
  cancelButton: 'button[type="button"]:has-text("Cancel")',

  // Common elements
  loadingSpinner: ".spinner",
  errorMessage: ".error-message",
  successMessage: ".success-message",
  modalOverlay: ".modal-overlay",
  modalCloseButton: ".modal-close",

  // Form elements
  requiredFieldMarker: ".required",
  validationError: ".field-error",
};

// Selector utilities
export const selectorUtils = {
  /**
   * Creates a data-testid selector
   * @param testId - The test ID value
   */
  byTestId: (testId: string) => `[data-testid="${testId}"]`,

  /**
   * Creates a selector for an element with specific text
   * @param tag - HTML tag
   * @param text - Text content
   */
  byText: (tag: string, text: string) => `${tag}:has-text("${text}")`,

  /**
   * Creates an nth-child selector
   * @param selector - Base selector
   * @param index - Index (0-based)
   */
  nthChild: (selector: string, index: number) =>
    `${selector}:nth-child(${index + 1})`,
};
