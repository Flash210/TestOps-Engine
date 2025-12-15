/**
 * Test Data Helper for Text Box Tests
 * Centralized test data management following DRY principle
 */

// ✅ FIX #26: Added interfaces for better type safety
// OLD: Static readonly objects with no type definitions
// NEW: Proper interfaces and type safety
export interface UserData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TestData {
  // Valid Test Data
  static readonly validUsers: Record<string, UserData> = {
    user1: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      currentAddress: '123 Main Street, New York, NY 10001',
      permanentAddress: '456 Park Avenue, New York, NY 10022'
    },
    user2: {
      fullName: 'Jane Smith',
      email: 'jane.smith@test.com',
      currentAddress: '789 Oak Avenue, Los Angeles, CA 90001',
      permanentAddress: '321 Pine Street, Los Angeles, CA 90002'
    },
    specialCharacters: {
      fullName: "O'Connor-Smith Jr.",
      email: 'oconnor@example.com',
      currentAddress: "Apt #5, Baker's Street",
      permanentAddress: "Unit 10-B, O'Reilly Complex"
    },
    longData: {
      fullName: 'Bartholomew Christopher Montgomery Alexander Richardson III',
      email: 'bartholomew.christopher.montgomery@verylongdomainname.com',
      currentAddress: '1234567890 Extremely Long Street Name with Multiple Words and Numbers Building Complex Suite 9999, Metropolitan City, State Name 12345-6789',
      permanentAddress: '9876543210 Another Very Long Address with Extended Information and Multiple Lines of Text'
    }
  };

  // ✅ FIX #27: Made arrays readonly for immutability
  // OLD: static readonly invalidEmails = [...]
  // NEW: static readonly invalidEmails: readonly string[] = [...]
  static readonly invalidEmails: readonly string[] = [
    'plaintext',
    '@example.com',
    'user@',
    'user @example.com',
    'user@.com',
    'user..name@example.com',
    'invalid-email-format'
  ];

  static readonly validEmails: readonly string[] = [
    'user@example.com',
    'user.name@example.com',
    'user+tag@example.co.uk',
    'user_name@example-domain.com',
    '123@example.com'
  ];

  // Boundary Test Data
  static readonly boundaryData: Record<string, UserData> = {
    emptyStrings: {
      fullName: '',
      email: '',
      currentAddress: '',
      permanentAddress: ''
    },
    singleCharacter: {
      fullName: 'A',
      email: 'a@b.c',
      currentAddress: '1',
      permanentAddress: '2'
    },
    numericValues: {
      fullName: 'User 123',
      email: 'user123@example.com',
      currentAddress: '123 Numeric Street, Apt 456',
      permanentAddress: '789 Number Boulevard'
    }
  };

  // Multiline Test Data
  static readonly multilineData: Record<string, UserData> = {
    fullAddress: {
      fullName: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      currentAddress: `Building A, Floor 5
789 Corporate Blvd
Los Angeles, CA 90001`,
      permanentAddress: `House 12, Street 45
Silicon Valley
San Francisco, CA 94016`
    }
  };

  // ✅ FIX #28: Improved random user generation with better uniqueness
  // OLD: static generateRandomUser() { const timestamp = Date.now(); ... }
  // NEW: Added counter and better formatting
  private static userCounter = 0;

  static generateRandomUser(): UserData {
    const timestamp = Date.now();
    this.userCounter++;
    
    return {
      fullName: `Test User ${timestamp}_${this.userCounter}`,
      email: `testuser${timestamp}_${this.userCounter}@example.com`,
      currentAddress: `${timestamp} Test Street, Unit ${this.userCounter}, Test City`,
      permanentAddress: `${timestamp} Permanent Avenue, Apt ${this.userCounter}, Test State`
    };
  }

  // ✅ FIX #29: Improved getUserData with type safety and error handling
  // OLD: No default case validation
  // NEW: Throws error for invalid user type
  static getUserData(userType: 'valid' | 'special' | 'long' | 'numeric' | 'random' = 'valid'): UserData {
    switch (userType) {
      case 'valid':
        return this.validUsers.user1;
      case 'special':
        return this.validUsers.specialCharacters;
      case 'long':
        return this.validUsers.longData;
      case 'numeric':
        return this.boundaryData.numericValues;
      case 'random':
        return this.generateRandomUser();
      default:
        // This should never happen due to TypeScript, but good practice
        throw new Error(`Invalid user type: ${userType}`);
    }
  }

  // ✅ FIX #30: Added utility methods for common test scenarios
  // NEW: Additional helper methods
  
  /**
   * Get a random invalid email from the list
   */
  static getRandomInvalidEmail(): string {
    const randomIndex = Math.floor(Math.random() * this.invalidEmails.length);
    return this.invalidEmails[randomIndex];
  }

  /**
   * Get a random valid email from the list
   */
  static getRandomValidEmail(): string {
    const randomIndex = Math.floor(Math.random() * this.validEmails.length);
    return this.validEmails[randomIndex];
  }

  /**
   * Create partial user data for testing specific fields
   */
  static createPartialUser(overrides: Partial<UserData>): UserData {
    const baseUser = this.validUsers.user1;
    return {
      ...baseUser,
      ...overrides
    };
  }
}
