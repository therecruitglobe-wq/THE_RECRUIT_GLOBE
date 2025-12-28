
/**
 * ------------------------------------------------------------------------------
 * PSEUDO EMAIL API ENDPOINT
 * ------------------------------------------------------------------------------
 * This API endpoint simulates sending an email. In a real-world application,
 * you would replace the simulated logic with an actual email service provider
 * like SendGrid, Resend, or AWS SES.
 *
 * The code is already structured to send all form submissions to:
 * hr@therecruitglobe.com
 *
 * To make this functional:
 * 1. Sign up for an email service provider (e.g., Resend).
 * 2. Get your API key and add it to your environment variables.
 * 3. Uncomment and adapt the example code block below using your provider's SDK.
 * ------------------------------------------------------------------------------
 */

export const config = {
  runtime: 'edge',
};

// This is a placeholder API endpoint.
// In a real-world scenario, you would integrate this with an email service
// like SendGrid, Resend, or AWS SES to actually send the email.
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { subject, body, attachment } = await req.json();

    if (!subject || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields: subject and body.' }), { status: 400 });
    }

    // --- PSEUDO EMAIL SENDING LOGIC ---
    // Here, you would use your email provider's SDK to send the email.
    // For example, using Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'forms@yourdomain.com', // Your verified sending email
    //   to: 'hr@therecruitglobe.com',
    //   subject: subject,
    //   html: `<p>${body.replace(/\n/g, '<br>')}</p>`,
    //   attachments: attachment ? [
    //     {
    //       filename: attachment.filename,
    //       content: attachment.content, // base64 content
    //     }
    //   ] : undefined,
    // });

    console.log('--- Email would be sent with the following data: ---');
    console.log('To: hr@therecruitglobe.com');
    console.log('Subject:', subject);
    console.log('Body:', body);
    if (attachment) {
        console.log('Attachment:', `${attachment.filename} (${attachment.type})`);
    }
    console.log('----------------------------------------------------');

    // Simulate network delay for a better user experience
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-email handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `An internal server error occurred: ${errorMessage}` }), { status: 500 });
  }
}
