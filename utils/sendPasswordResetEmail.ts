// sendPasswordResetEmail.ts | This utility function sends a password reset email to a user requesting it.
import nodemailer from "nodemailer";

type TranslationKeys = 'en' | 'da';

interface Translation {
  subject: string;
  heading: string;
  message: string;
  buttonText: string;
  ignoreMessage: string;
}

const translations: Record<TranslationKeys, Translation> = {
  en: {
    subject: "Reset Your Password",
    heading: "Password Reset Request",
    message: "Click the link below to reset your password. This link will expire in 1 hour.",
    buttonText: "Reset Password",
    ignoreMessage: "If you didn't request this, you can safely ignore this email."
  },
  da: {
    subject: "Nulstil din adgangskode",
    heading: "Anmodning om nulstilling af adgangskode",
    message: "Klik på linket nedenfor for at nulstille din adgangskode. Dette link udløber om 1 time.",
    buttonText: "Nulstil adgangskode",
    ignoreMessage: "Hvis du ikke har anmodet om dette, kan du ignorere denne e-mail."
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (
    email: string, 
    resetUrl: string, 
    language: TranslationKeys = 'en'
  ) => {
    // Add logging at the start of the function
    console.log("Starting to send password reset email");
    console.log("Email language setting:", language);
  
    // Validate language input with a type guard
    if (language !== 'en' && language !== 'da') {
      console.warn("Invalid language received, falling back to English");
      language = 'en';
    }
  
    const translation = translations[language];
    
    // Log the translation being used
    console.log("Using translation for language:", language);
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: translation.subject,
      html: `
        <!DOCTYPE html>
        <html lang="${language}">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">${translation.heading}</h1>
            <p>${translation.message}</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #6C63FF; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              ${translation.buttonText}
            </a>
            <p style="color: #666; font-size: 0.9em;">${translation.ignoreMessage}</p>
          </div>
        </body>
        </html>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Reset email sent successfully in", language);
    } catch (error) {
      console.error("Failed to send reset email:", error);
      throw error;
    }
  };