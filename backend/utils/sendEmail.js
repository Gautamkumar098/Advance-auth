import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
from: "Auth App <onboarding@resend.dev>"  
,    to: email,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};