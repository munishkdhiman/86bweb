import { NextRequest, NextResponse } from 'next/server';

// Receives the contact and early-access forms and emails them via Resend.
// Body: { subject: string, replyTo?: string, fields: Record<string, string> }

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const subject = String(body?.subject ?? 'New enquiry').slice(0, 200);
    const replyTo = typeof body?.replyTo === 'string' ? body.replyTo : undefined;
    const fields: Record<string, string> =
      body?.fields && typeof body.fields === 'object' ? body.fields : {};

    const apiKey    = process.env.RESEND_API_KEY;
    const toEmail   = process.env.CONTACT_EMAIL || 'munish@gestureresearch.com';
    const fromEmail = process.env.FROM_EMAIL    || 'noreply@gestureresearch.com';

    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY not set');
      // Don't silently drop real submissions in production.
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Email is not configured. Please write to hello@86b.ai' }, { status: 503 });
      }
      return NextResponse.json({ success: true, dev: true });
    }

    const rows = Object.entries(fields)
      .filter(([, v]) => typeof v === 'string' && v.trim())
      .map(([k, v]) => `<tr><td style="padding:8px 0;color:#5A6A7A;width:140px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(String(v).slice(0, 5000))}</td></tr>`)
      .join('');

    const emailHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#2F352A">
      <h2 style="border-bottom:2px solid #74835F;padding-bottom:8px">${escapeHtml(subject)}</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">${rows}</table>
      <p style="margin-top:24px;font-size:11px;color:#9aa5b4">Sent via the 86b.ai website${replyTo ? ' · Reply to respond directly' : ''}</p>
    </div>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `86b.ai Website <${fromEmail}>`,
        to: [toEmail],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        html: emailHtml,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[contact] Resend error:', data);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error('[contact] Unexpected error:', e?.message);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please email us at hello@86b.ai' },
      { status: 500 }
    );
  }
}
