/**
 * Common selectors shared across multiple pages
 * Centralized selector management for consistent element location
 */
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

/**
 * Selector utility functions for dynamic selector generation
 */
export const selectorUtils = {
  /**
   * Creates a data-testid selector
   * @param testId - The test ID value
   * @returns Selector string for data-testid attribute
   * @example
   * selectorUtils.byTestId('submit-button') // Returns: [data-testid="submit-button"]
   */
  byTestId: (testId: string): string => {
    if (!testId) {
      throw new Error('testId parameter is required');
    }
    return `[data-testid="${testId}"]`;
  },

  /**
   * Creates a selector for an element with specific text
   * @param tag - HTML tag name
   * @param text - Text content to search for
   * @returns Selector string with text matcher
   * @example
   * selectorUtils.byText('button', 'Submit') // Returns: button:has-text("Submit")
   */
  byText: (tag: string, text: string): string => {
    if (!tag || !text) {
      throw new Error('Both tag and text parameters are required');
    }
    return `${tag}:has-text("${text}")`;
  },

  /**
   * Creates an nth-child selector
   * @param selector - Base selector string
   * @param index - Zero-based index
   * @returns Selector string with nth-child
   * @example
   * selectorUtils.nthChild('div.item', 2) // Returns: div.item:nth-child(3)
   */
  nthChild: (selector: string, index: number): string => {
    if (!selector) {
      throw new Error('selector parameter is required');
    }
    if (index < 0) {
      throw new Error('index must be non-negative');
    }
    return `${selector}:nth-child(${index + 1})`;
  },

  /**
   * Creates a selector for an element by aria-label
   * @param label - ARIA label value
   * @returns Selector string for aria-label attribute
   */
  byAriaLabel: (label: string): string => {
    if (!label) {
      throw new Error('label parameter is required');
    }
    return `[aria-label="${label}"]`;
  },

  /**
   * Creates a selector by role and name
   * @param role - ARIA role
   * @param name - Accessible name
   * @returns Playwright role selector string
   */
  byRole: (role: string, name?: string): string => {
    if (!role) {
      throw new Error('role parameter is required');
    }
    return name ? `role=${role}[name="${name}"]` : `role=${role}`;
  },

  /**
   * Creates a selector for elements containing a specific class
   * @param className - Class name to search for
   * @returns Class selector string
   */
  byClass: (className: string): string => {
    if (!className) {
      throw new Error('className parameter is required');
    }
    return `.${className}`;
  },

  /**
   * Creates a combined selector with multiple conditions
   * @param selectors - Array of selector strings to combine
   * @returns Combined selector string
   */
  combine: (...selectors: string[]): string => {
    if (selectors.length === 0) {
      throw new Error('At least one selector is required');
    }
    return selectors.join(' ');
  },
};
