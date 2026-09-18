# TickyTICKEY platform

The Next.js staff portal and Expo resident app share one Supabase backend. Authentication, authorization, realtime synchronization, appointments, consultations/messages, medicine inventory, health records, announcements, private attachments, audit logs, and settings are represented in the production schema.

## Supabase setup

1. Create a Supabase project and enable Email/password authentication. Phone numbers remain resident profile/contact data and do not require an SMS provider.
2. Apply the SQL files in `supabase/migrations` in filename order. The migrations enable RLS and realtime, create the private attachment bucket, and align existing profiles with email OTP authentication.
3. In **Authentication → Email Templates**, make both **Confirm signup** and **Reset password** render the six-digit value with `{{ .Token }}`. The app verifies signup codes as `email` OTPs and reset codes as `recovery` OTPs. For example:

```html
<h2>Your TickyTICKEY verification code</h2>
<p>Enter this code in the app:</p>
<p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">{{ .Token }}</p>
<p>This code expires shortly. If you did not request it, ignore this email.</p>
```

Supabase's built-in sender is useful for development and low-volume testing. Configure a custom SMTP provider before a public production launch so delivery limits and sender reputation are under your control.

4. Create the first staff account in Supabase Authentication. Then promote it in the SQL editor:

```sql
update public.profiles
set role = 'admin'
where id = 'AUTH_USER_UUID';
```

5. Copy `.env.example` to `.env.local` and use the project URL and publishable/anon key. Set `SUPABASE_SERVICE_ROLE_KEY` only in the server environment if administrators need to invite new staff; never expose it with a `NEXT_PUBLIC_`/`EXPO_PUBLIC_` prefix or place it in the mobile app.

Existing phone-only Supabase Auth users need an email identity added or a new email-based account before they can use email password recovery. New resident registrations collect and verify email automatically.

## Web development and Vercel

```bash
npm install
npm run dev
```

For Vercel, import `tickytickey-web` as the project root and add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` to Development, Preview, and Production. Add the Vercel production/preview URLs to Supabase Authentication's allowed redirect URLs.

Validation commands:

```bash
npm run build
npm audit --omit=dev
```

Health and identity data is never placed in a shared Next.js cache. Dashboard responses are authenticated, role checked, RLS constrained, and marked `private, no-store`; public static pages retain normal Vercel caching.

## Mobile

Copy the same public Supabase values into `tickytickey-mobile/.env`, using the `EXPO_PUBLIC_` names shown there. See the mobile README for Expo commands and Apple privacy configuration.
