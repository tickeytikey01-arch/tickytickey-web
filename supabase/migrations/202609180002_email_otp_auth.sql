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
declare
  user_role public.app_role := 'resident';
  sanitized_purok text := null;
begin
  if (new.raw_user_meta_data ->> 'role') in ('resident', 'bhw', 'nurse', 'doctor', 'admin') then
    user_role := (new.raw_user_meta_data ->> 'role')::public.app_role;
  end if;

  if (new.raw_user_meta_data ->> 'purok') ~ '^Purok [1-6]$' then
    sanitized_purok := (new.raw_user_meta_data ->> 'purok');
  end if;

  insert into public.profiles (id, role, full_name, email, mobile, purok, station, status)
  values (
    new.id,
    user_role,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), 'Resident'),
    new.email,
    coalesce(nullif(new.phone, ''), nullif(new.raw_user_meta_data ->> 'mobile', '')),
    sanitized_purok,
    nullif(new.raw_user_meta_data ->> 'station', ''),
    'active'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = coalesce(excluded.email, public.profiles.email),
    role = case when public.profiles.role = 'resident' and excluded.role <> 'resident' then excluded.role else public.profiles.role end,
    mobile = coalesce(excluded.mobile, public.profiles.mobile),
    purok = coalesce(excluded.purok, public.profiles.purok),
    station = coalesce(excluded.station, public.profiles.station);

  if user_role = 'resident' then
    insert into public.health_records (resident_id)
    values (new.id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;
