-- Align existing profiles and new resident accounts with email OTP authentication.
update public.profiles as profile
set email = auth_user.email
from auth.users as auth_user
where profile.id = auth_user.id
  and auth_user.email is not null
  and profile.email is distinct from auth_user.email;

create unique index if not exists profiles_email_unique
on public.profiles(lower(email))
where email is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, mobile, purok)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), 'Resident'),
    new.email,
    coalesce(nullif(new.phone, ''), nullif(new.raw_user_meta_data ->> 'mobile', '')),
    nullif(new.raw_user_meta_data ->> 'purok', '')
  );
  insert into public.health_records (resident_id) values (new.id);
  return new;
end;
$$;
