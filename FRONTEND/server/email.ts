import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
export async function sendSubscriptionEmail(email: string) {
  console.log("sendSubscriptionEmail called with:", email);
  console.log("email, passwords are:", process.env.SMTP_EMAIL, "-", process.env.SMTP_PASSWORD);

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error("SMTP credentials missing");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"TrustBlocks" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "You’re on the TrustBlocks updates list 🚀",
      html: `
        <p>Hi there 👋</p>
        <p>Thanks for signing up for <strong>TrustBlocks updates</strong>.</p>
        <p>We’ll notify you when new features or simulations are released.</p>
        <br />
        <p>— Team TrustBlocks</p>
      `,
    });

    console.log("✅ Email sent via Gmail SMTP:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email via SMTP:", err);
  }
}
