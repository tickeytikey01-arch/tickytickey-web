-- Migration: 202609180003_default_admin.sql
-- Description: Seed default administrator accounts for TickyTICKEY web portal

create extension if not exists pgcrypto with schema extensions;

do $$
declare
  admin_id uuid := '00000000-0000-0000-0000-000000000001';
  admin_email text := 'admin@tickytickey.ph';
  admin_phone text := '+639205556677';
  encrypted_pw text := extensions.crypt('Admin@123456', extensions.gen_salt('bf'));
begin
  -- 1. Upsert auth.users record if table exists
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
        '{"full_name":"System Administrator","role":"admin","purok":"Barangay Hall ICT"}',
        false,
        'authenticated'
      )
      on conflict (id) do update set
        email = excluded.email,
        encrypted_password = excluded.encrypted_password,
        raw_user_meta_data = excluded.raw_user_meta_data;
    end if;
  end if;

  -- 2. Upsert public.profiles record
  insert into public.profiles (
    id,
    role,
    full_name,
    email,
    mobile,
    purok,
    barangay,
    address,
    status
  ) values (
    admin_id,
    'admin',
    'System Administrator',
    admin_email,
    admin_phone,
    'Barangay Hall ICT',
    'San Antonio',
    'ICT Office, Barangay San Antonio Hall, Pasig City',
    'Active'
  )
  on conflict (id) do update set
    role = 'admin',
    full_name = 'System Administrator',
    email = admin_email,
    status = 'Active';

  -- 3. Also ensure tickeytikey01@gmail.com has admin role if already registered
  update public.profiles
  set role = 'admin', status = 'Active'
  where lower(email) = 'tickeytikey01@gmail.com';

end $$;
