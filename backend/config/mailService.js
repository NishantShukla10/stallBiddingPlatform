import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (to, subject, text, html) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER,
      subject,
      text,
      html,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error("Email send failed:", error.response?.body || error);
  }
};