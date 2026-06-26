import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

import { sendEmail } from "./sendEmail.js";

export const sendVerificationEmail = async (
  email,
  verificationToken
) => {
  try {
    await sendEmail(
      email,
      "Verify Your Email",
      VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      )
    );

    console.log("Verification Email Sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await sendEmail(
      email,
      "Welcome to Auth App",
      WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
    );

    console.log("Welcome Email Sent");


  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (
  email,
  resetURL
) => {
  try {
    await sendEmail(
      email,
      "Reset Your Password",
      PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      )
    );

    console.log("Password Reset Email Sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendResetSuccessEmail = async (
  email
) => {
  try {
    await sendEmail(
      email,
      "Password Reset Successful",
      PASSWORD_RESET_SUCCESS_TEMPLATE
    );

    console.log("Password Reset Success Email Sent");
  } catch (error) {
    console.log(error);
  }
};