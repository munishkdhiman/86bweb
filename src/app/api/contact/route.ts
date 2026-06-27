import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, role, service, budget, message } = body;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || 'hello@86b.ai';

    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY not set. Logging submission:', body);
      return NextResponse.json({ success: true, dev: true });
    }

    const emailText = [
      'New enquiry received via 86b.ai contact form',
      '──────────────────────────────────────────────',
      '',
      'Name:     ' + firstName + ' ' + lastName,
      'Email:    ' + email,
      'Company:  ' + company,
      'Role:     ' + role,
      '',
      'Service of interest: ' + service,
      'Budget range:        ' + budget,
      '',
      'Message:',
      message,
    ].join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        from: '86b.ai Contact Form <noreply@86b.ai>',
        to: [toEmail],
        reply_to: email,
        subject: 'New enquiry — ' + firstName + ' ' + lastName + ' (' + company + ')',
        text: emailText,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[contact] Resend error:', errorBody);
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
