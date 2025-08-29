import nodemailer from "nodemailer";

export const emailManager = async (to, text, subject) => {
  // Brevo SMTP transporter
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587, // use 587 for TLS (recommended), 465 if SSL
    auth: {
      user: process.env.EMAIL_USER, // usually your Brevo login email
      pass: process.env.EMAIL_PASS      // Brevo SMTP key from dashboard
    },
  });

  await transport.sendMail({
    from: '"Expense Tracker" <arehmanali000@gmail.com>', // sender info
    to: to,
    subject: subject,
    text: text,
    // you can also send HTML if needed
    html: `<p>${text}</p>`,
  });
};

