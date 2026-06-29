import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, role, service, budget, message } = body;

    const toEmail      = process.env.CONTACT_EMAIL      || 'munish@gestureresearch.com';
    const gmailUser    = process.env.GMAIL_USER          || 'munish@gestureresearch.com';
    const clientId     = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.warn('[contact] Gmail OAuth2 credentials not configured');
      return NextResponse.json({ success: true, dev: true });
    }

    const subject = `New Enquiry: ${firstName} ${lastName} | ${company}`;
    const emailHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#0E202E"><h2 style="border-bottom:2px solid #29B6F6;padding-bottom:8px">New Enquiry - 86b.ai</h2><table style="width:100%;border-collapse:collapse;margin-top:16px"><tr><td style="padding:8px 0;color:#5A6A7A;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${firstName} ${lastName}</td></tr><tr><td style="padding:8px 0;color:#5A6A7A">Email</td><td style="padding:8px 0">${email}</td></tr><tr><td style="padding:8px 0;color:#5A6A7A">Company</td><td style="padding:8px 0">${company}</td></tr><tr><td style="padding:8px 0;color:#5A6A7A">Role</td><td style="padding:8px 0">${role}</td></tr><tr><td style="padding:8px 0;color:#5A6A7A">Service</td><td style="padding:8px 0">${service}</td></tr><tr><td style="padding:8px 0;color:#5A6A7A">Budget</td><td style="padding:8px 0">${budget}</td></tr></table><div style="margin-top:24px;background:#f4f7fa;padding:16px;border-radius:8px"><p style="margin:0;color:#5A6A7A;font-size:12px;text-transform:uppercase;letter-spacing:1px">Message</p><p style="margin:8px 0 0;white-space:pre-wrap">${message}</p></div></div>`;

    const rawEmail = [
      `From: "86b.ai Contact Form" <${gmailUser}>`,
      `To: ${toEmail}`,
      `Reply-To: ${email}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=UTF-8',
      '',
      emailHtml,
    ].join('\r\n');

    const encodedEmail = Buffer.from(rawEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedEmail },
    });

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const e = err as { message?: string; response?: { data?: unknown } };
    console.error('[contact] Gmail API error:', e?.message, e?.response?.data);
    return NextResponse.json(
      { error: 'Email send failed', detail: e?.message, gmailError: e?.response?.data },
      { status: 500 }
    );
  }
}
