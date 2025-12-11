/**
 * Test Data Helper for Text Box Tests
 * Centralized test data management following DRY principle
 */

export class TestData {
  // Valid Test Data
  static readonly validUsers = {
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

  // Invalid Email Formats
  static readonly invalidEmails = [
    'plaintext',
    '@example.com',
    'user@',
    'user @example.com',
    'user@.com',
    'user..name@example.com',
    'invalid-email-format'
  ];

  // Valid Email Formats
  static readonly validEmails = [
    'user@example.com',
    'user.name@example.com',
    'user+tag@example.co.uk',
    'user_name@example-domain.com',
    '123@example.com'
  ];

  // Boundary Test Data
  static readonly boundaryData = {
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
  static readonly multilineData = {
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

  // Helper method to generate random user data
  static generateRandomUser() {
    const timestamp = Date.now();
    return {
      fullName: `Test User ${timestamp}`,
      email: `testuser${timestamp}@example.com`,
      currentAddress: `${timestamp} Test Street, Test City`,
      permanentAddress: `${timestamp} Permanent Avenue, Test State`
    };
  }

  // Helper method to get user by type
  static getUserData(userType: 'valid' | 'special' | 'long' | 'numeric' | 'random' = 'valid') {
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
        return this.validUsers.user1;
    }
  }
}
