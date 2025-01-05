// config/environment.ts is a file that contains all the environment variables and configuration for the application. 
// This file is used to store all the configuration values that are used throughout the application. 
// This file is also used to store the validation configuration for the application. 
// The environment variables are stored in the environment object, which is exported from this file. 

export const environment = {
    app: {
      name: 'Clarity',
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
    },
    
    database: {
      url: ensureEnvVar('DATABASE_URL'),
      provider: 'mongodb',
    },
    
    auth: {
      nextAuthUrl: ensureEnvVar('NEXTAUTH_URL'),
      nextAuthSecret: ensureEnvVar('NEXTAUTH_SECRET'),
      jwtSecret: ensureEnvVar('JWT_SECRET'),
      passwordResetTimeout: 300000, // 5 minutes in milliseconds (1000 miliseconds * 60 seconds * 5 minutes)
      verificationTimeout: 300000,  // 5 minutes in milliseconds (1000*60*5)
      maxLoginAttempts: 3,
      loginAttemptsWindow: 300000,  // 5 minutes in milliseconds (1000*60*5)
    },
    
    email: {
      user: ensureEnvVar('EMAIL_USER'),
      pass: ensureEnvVar('EMAIL_PASS'),
      service: 'gmail',
      from: 'clarityappdk@gmail.com',
    },
    
    validation: {
      task: {
        maxTitleLength: 30,
        maxDescriptionLength: 500,
      },
      user: {
        minPasswordLength: 8,
      },
    },
  } as const;
  
  // Helper function to ensure environment variables exist
  function ensureEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  }
  
  // Type exports
  export type Environment = typeof environment;
  export type ValidationConfig = Environment['validation'];