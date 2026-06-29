import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, role, service, budget, message } = body;

    const toEmail      = process.env.CONTACT_EMAIL || 'munish@gestureresearch.com';
    const gmailUser    = process.env.GMAIL_USER || 'munish@gestureresearch.com';
    const clientId     = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.warn('[contact] Gmail OAuth2 credentials not set — logging submission:', body);
      return NextResponse.json({ success: true, dev: true });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #0E202E;">
        <h2 style="border-bottom: 2px solid #29B6F6; padding-bottom: 8px;">
          New Enquiry — 86b.ai
        </h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding:8px 0; color:#5A6A7A; width:140px;">Name</td>
              <td style="padding:8px 0; font-weight:600;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0; color:#5A6A7A;">Email</td>
              <td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0; color:#5A6A7A;">Company</td>
              <td style="padding:8px 0;">${company}</td></tr>
          <tr><td style="padding:8px 0; color:#5A6A7A;">Role</td>
              <td style="padding:8px 0;">${role}</td></tr>
          <tr><td style="padding:8px 0; color:#5A6A7A;">Service</td>
              <td style="padding:8px 0;">${service}</td></tr>
          <tr><td style="padding:8px 0; color:#5A6A7A;">Budget</td>
              <td style="padding:8px 0;">${budget}</td></tr>
        </table>
        <div style="margin-top: 24px; background: #f4f7fa; padding: 16px; border-radius: 8px;">
          <p style="margin:0; color:#5A6A7A; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Message</p>
          <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:24px; font-size:11px; color:#9aa5b4;">
          Sent via 86b.ai contact form · Reply to this email to respond directly to ${firstName}
        </p>
      </div>
    `;

    // --- Send via Gmail API (OAuth2) — uses Google directly, no third-party ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: gmailUser,
        clientId,
        clientSecret,
        refreshToken,
      },
    });

    await transporter.sendMail({
      from: `"86b.ai Contact Form" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Enquiry: ${firstName} ${lastName} | ${company}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Error sending email:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please email us at munish@86b.ai' },
      { status: 500 }
    );
  }
}
