-- Migration: 202609180003_default_admin.sql
-- Description: Seed default administrator accounts for TickyTICKEY web portal

create extension if not exists pgcrypto with schema extensions;

-- 1. Ensure handle_new_user() properly sanitizes purok against ^Purok [1-6]$ and sets role
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
    station = coalesce(excluded.station, public.profiles.station),
    status = 'active';

  if user_role = 'resident' then
    insert into public.health_records (resident_id)
    values (new.id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

-- 2. Seed default admin in auth.users and public.profiles
do $$
declare
  admin_id uuid := '00000000-0000-0000-0000-000000000001';
  admin_email text := 'admin@tickytickey.ph';
  admin_phone text := '+639205556677';
  encrypted_pw text := extensions.crypt('Admin@123456', extensions.gen_salt('bf'));
begin
  -- Upsert auth.users record if table exists
  if exists (select 1 from information_schema.tables where table_schema = 'auth' and table_name = 'users') then
    if not exists (select 1 from auth.users where email = admin_email) then
      insert into auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        role
      ) values (
        admin_id,
        '00000000-0000-0000-0000-000000000000',
        admin_email,
        encrypted_pw,
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"System Administrator","role":"admin","station":"Barangay Hall ICT"}',
        false,
        'authenticated'
      )
      on conflict (id) do update set
        email = excluded.email,
        encrypted_password = excluded.encrypted_password,
        raw_user_meta_data = excluded.raw_user_meta_data;
    else
      update auth.users
      set
        encrypted_password = encrypted_pw,
        raw_user_meta_data = jsonb_build_object('full_name', 'System Administrator', 'role', 'admin', 'station', 'Barangay Hall ICT')
      where email = admin_email;
    end if;
  end if;

  -- Upsert public.profiles record
  insert into public.profiles (
    id,
    role,
    full_name,
    email,
    mobile,
    purok,
    station,
    barangay,
    address,
    status
  ) values (
    admin_id,
    'admin',
    'System Administrator',
    admin_email,
    admin_phone,
    null,
    'Barangay Hall ICT',
    'Barangay 1, Pasig City',
    'ICT Office, Barangay San Antonio Hall, Pasig City',
    'active'
  )
  on conflict (id) do update set
    role = 'admin',
    full_name = 'System Administrator',
    email = admin_email,
    mobile = admin_phone,
    purok = null,
    station = 'Barangay Hall ICT',
    address = 'ICT Office, Barangay San Antonio Hall, Pasig City',
    status = 'active';

  -- Also ensure tickeytikey01@gmail.com has admin role if already registered
  update public.profiles
  set role = 'admin', status = 'active'
  where lower(email) = 'tickeytikey01@gmail.com';

end $$;
