// Form submission for a static site (no server routes on GitHub Pages).
// If NEXT_PUBLIC_FORM_ENDPOINT is set (e.g. a Formspree or Web3Forms URL), the
// form is POSTed there as JSON. Otherwise we open a pre-filled email instead.
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';
const fallbackEmail = 'hello@86b.ai';

export type SubmitResult = 'sent' | 'mailto';

export async function submitForm(subject: string, fields: Record<string, string>): Promise<SubmitResult> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, subject, ...fields }),
    });
    if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
    return 'sent';
  }

  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
