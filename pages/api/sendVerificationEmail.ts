// sendVerificationEmail.ts function sends a verification email to the user's email address.
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, verificationUrl: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email Address",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
