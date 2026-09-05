// Auto-reply to waitlist signups.
// "submission-created" is a Netlify trigger name: this runs automatically on every
// verified form submission (spam/honeypot submissions are discarded before this fires).
// Requires env var RESEND_API_KEY (Netlify: Site configuration -> Environment variables).

const EMAIL_TEXT = `You're in.

That's it, that's the email. You're on the Do Over waitlist.

What happens next: invites go out in small waves, in waitlist order, starting with the beta. You'll get one email when yours is ready. Nothing before, nothing after. No countdowns, no "last chance" nonsense. Consider this inbox a preview of how the whole product treats you.

Your founding price ($49/yr) is locked from today and never rises while you stay.

One ask, if you have 30 seconds: reply to this email with the exact moment your last planner died for you. Not a review, just the moment. Real stories become the acceptance tests this thing has to pass before it ships.

Change your mind, or want your email gone entirely? Reply "delete" and it's done. No hard feelings, and honestly, no surprise. Abandoning things is kind of our whole demographic.

Julio
one person with ADHD, building the planner for the day that falls apart
https://getdoover.com`;

exports.handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body);
    const email = (payload && (payload.email || (payload.data && payload.data.email))) || null;
    if (!email) return { statusCode: 200, body: "no email field; skipped" };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Julio at Do Over <hello@getdoover.com>",
        to: [email],
        reply_to: "jcastilla358@gmail.com",
        subject: "You're on the Do Over waitlist",
        text: EMAIL_TEXT,
      }),
    });
    if (!res.ok) console.log("resend error", res.status, await res.text());
  } catch (err) {
    console.log("autoreply error", err && err.message);
  }
  // Always 200: a failed auto-reply must never look like a failed signup.
  return { statusCode: 200, body: "ok" };
};
