export const config = {
    baseURL: process.env.BASE_URL || 'https://demoqa.com',
    timeout: {
      navigation: 30000,
      default: 10000,
    },
    viewport: {
      width: 1920,
      height: 1080,
    }
  };