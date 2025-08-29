import axios from "axios";

export const emailManager = async (to, subject, text) => {
  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.EMAIL_USER, name: "Expense Tracker" },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: `<p>${text}</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,   // Your Brevo API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", res.data.messageId || res.data);
  } catch (err) {
    console.error("Email sending failed:", err.response?.data || err.message);
  }
};
