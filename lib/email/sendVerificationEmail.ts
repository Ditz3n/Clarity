// lib/email/sendVerificationEmail.ts | A function for sending a verification email to a user
import nodemailer from "nodemailer";

// Define the available translation keys (DA = Danish, EN = English)
type TranslationKeys = 'en' | 'da';

// Interface for the translation object
interface VerificationTranslation {
  subject: string;
  heading: string;
  message: string;
  buttonText: string;
  ignoreMessage: string;
}

// Define the translations for each language
const verificationTranslations: Record<TranslationKeys, VerificationTranslation> = {
  en: {
    subject: "Verify Your Email Address",
    heading: "Email Verification",
    message: "Click the link below to verify your email address.",
    buttonText: "Verify Email",
    ignoreMessage: "If you didn't sign up for this, you can safely ignore this email."
  },
  da: {
    subject: "Bekræft din e-mailadresse",
    heading: "Bekræftelse af e-mail",
    message: "Klik på linket nedenfor for at bekræfte din e-mailadresse.",
    buttonText: "Bekræft e-mail",
    ignoreMessage: "Hvis du ikke har tilmeldt dig, kan du ignorere denne e-mail."
  }
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  verificationUrl: string,
  language: TranslationKeys = 'en'
) => {
  // Validate language input with a type guard
  if (language !== 'en' && language !== 'da') {
    console.warn("Invalid language received, falling back to English");
    language = 'en';
  }

  const translation = verificationTranslations[language];

  // Define the layout of the email sent to the user
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
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #6C63FF; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            ${translation.buttonText}
          </a>
          <p style="color: #666; font-size: 0.9em;">${translation.ignoreMessage}</p>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully in", language);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};