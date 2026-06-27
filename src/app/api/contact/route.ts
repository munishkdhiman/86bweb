import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, role, service, budget, message } = body;

    // ── Zoho SMTP credentials from environment variables ──────────────────────
    const zohoUser = process.env.ZOHO_USER;       // e.g. Info@86b.ai
    const zohoPass = process.env.ZOHO_APP_PASSWORD; // App-specific password from Zoho
    const toEmail  = process.env.CONTACT_EMAIL || 'Info@86b.ai';

    if (!zohoUser || !zohoPass) {
      console.warn('[contact] Zoho credentials not set — logging submission:', body);
      return NextResponse.json({ success: true, dev: true });
    }

    // ── Create Zoho SMTP transporter ──────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',   // Use smtp.zoho.com if your account is not India-based
      port: 587,
      secure: false,          // STARTTLS on port 587
      auth: {
        user: zohoUser,
        pass: zohoPass,
      },
    });

    // ── Build email content ───────────────────────────────────────────────────
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
          Sent via 86b.ai contact form
        </p>
      </div>
    `;

    // ── Send email ────────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"86b.ai Contact Form" <${zohoUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry — ${firstName} ${lastName} (${company})`,
      html: emailHtml,
      text: [
        'New enquiry received via 86b.ai contact form',
        '─'.repeat(46),
        `Name:     ${firstName} ${lastName}`,
        `Email:    ${email}`,
        `Company:  ${company}`,
        `Role:     ${role}`,
        `Service:  ${service}`,
        `Budget:   ${budget}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Email send error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email Info@86b.ai directly.' },
      { status: 500 }
    );
  }
}
