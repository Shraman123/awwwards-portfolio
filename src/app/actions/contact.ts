"use server";
import { Resend } from 'resend';

// Initialize Resend with the API key from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
    const { data, error } = await resend.emails.send({
      // Resend requires verified domains, but their onboarding email works for free testing
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'hazrashraman875@gmail.com', // Your actual email
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--\nSent from your Next.js Portfolio`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { error: "Failed to send message via Resend." };
    }

    return { success: true };
  } catch (error) {
    console.error('Server Error:', error);
    return { error: "Internal server error." };
  }
}
