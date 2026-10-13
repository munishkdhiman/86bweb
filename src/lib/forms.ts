// Sends a website form to /api/contact, which emails it via Resend.
export async function submitForm(subject: string, fields: Record<string, string>, replyTo?: string): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, fields, replyTo }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
}
