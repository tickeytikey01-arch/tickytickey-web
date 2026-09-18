-- TickyTICKEY production schema. Run with `supabase db push` or paste into the
-- Supabase SQL editor once. All client access is constrained by RLS.
create extension if not exists pgcrypto;

create type public.app_role as enum ('resident', 'bhw', 'nurse', 'doctor', 'admin');
create type public.consultation_status as enum ('waiting', 'active', 'replied', 'resolved');
create type public.priority_level as enum ('low', 'medium', 'high', 'urgent');
create type public.appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'resident',
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text,
  mobile text check (mobile is null or mobile ~ '^\+639[0-9]{9}$'),
  purok text check (purok is null or purok ~ '^Purok [1-6]$'),
  barangay text not null default 'Barangay 1, Pasig City',
  address text,
  philhealth_id text,
  blood_type text,
  gender text,
  birth_date date,
  emergency_contact text,
  license_number text,
  station text,
  status text not null default 'active' check (status in ('active', 'inactive', 'pending')),
  notification_preferences jsonb not null default '{"sms":true,"appointments":true,"health_drives":true}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_mobile_unique on public.profiles(mobile) where mobile is not null;
create unique index profiles_email_unique on public.profiles(lower(email)) where email is not null;
create index profiles_role_idx on public.profiles(role);
create index profiles_purok_idx on public.profiles(purok);
create index profiles_status_role_idx on public.profiles(status, role);
create index profiles_name_search_idx on public.profiles(lower(full_name));

create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  case_number text not null unique default ('CONS-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(gen_random_uuid()::text, 1, 6))),
  resident_id uuid not null references public.profiles(id) on delete restrict,
  assigned_staff_id uuid references public.profiles(id) on delete set null,
  concern text not null check (char_length(concern) between 3 and 500),
  symptoms text[] not null default '{}',
  notes text check (notes is null or char_length(notes) <= 2000),
  status public.consultation_status not null default 'waiting',
  priority public.priority_level not null default 'medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index consultations_resident_idx on public.consultations(resident_id, created_at desc);
create index consultations_staff_status_idx on public.consultations(assigned_staff_id, status, created_at desc);
create index consultations_status_created_idx on public.consultations(status, created_at desc);
create index consultations_symptoms_gin_idx on public.consultations using gin(symptoms);

create table public.consultation_messages (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references public.consultations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete restrict,
  body text not null default '' check (char_length(body) <= 4000),
  attachment_path text,
  attachment_type text check (attachment_type is null or attachment_type in ('image', 'document')),
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (char_length(body) > 0 or attachment_path is not null)
);

create index consultation_messages_thread_idx on public.consultation_messages(consultation_id, created_at);
create index consultation_messages_unread_idx on public.consultation_messages(consultation_id, created_at desc)
  where read_at is null;
create index consultation_messages_sender_idx on public.consultation_messages(sender_id, created_at desc);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.profiles(id) on delete restrict,
  assigned_staff_id uuid references public.profiles(id) on delete set null,
  category text not null check (category in ('General Checkup', 'Immunization', 'Prenatal', 'Senior Wellness')),
  title text not null check (char_length(title) between 2 and 160),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text not null,
  notes text check (notes is null or char_length(notes) <= 1000),
  status public.appointment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index appointments_resident_idx on public.appointments(resident_id, starts_at desc);
create index appointments_schedule_idx on public.appointments(starts_at, status);
create index appointments_staff_schedule_idx on public.appointments(assigned_staff_id, starts_at)
  where assigned_staff_id is not null and status <> 'cancelled';
create unique index appointments_staff_slot_unique on public.appointments(assigned_staff_id, starts_at)
  where assigned_staff_id is not null and status in ('pending', 'confirmed');

create table public.medicines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  generic_name text,
  category text not null,
  dosage text not null,
  adult_dosage text,
  pediatric_dosage text,
  description text not null default '',
  instructions text not null default '',
  cautions text[] not null default '{}',
  side_effects text[] not null default '{}',
  symptom_tags text[] not null default '{}',
  form text not null default 'Tablet',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 20 check (low_stock_threshold >= 0),
  is_active boolean not null default true,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, dosage)
);

create index medicines_active_name_idx on public.medicines(is_active, name);
create index medicines_tags_gin_idx on public.medicines using gin(symptom_tags);
create index medicines_low_stock_idx on public.medicines(stock_quantity, low_stock_threshold)
  where is_active;

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  content text not null check (char_length(content) between 3 and 5000),
  category text not null,
  priority text not null default 'Normal' check (priority in ('Normal', 'Important', 'Urgent')),
  status text not null default 'Draft' check (status in ('Published', 'Draft', 'Scheduled')),
  target_audience text not null default 'All Barangays',
  broadcast_channels text[] not null default '{}',
  author_id uuid not null references public.profiles(id) on delete restrict,
  scheduled_at timestamptz,
  published_at timestamptz,
  reach_count integer not null default 0 check (reach_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index announcements_feed_idx on public.announcements(status, published_at desc);
create index announcements_schedule_idx on public.announcements(scheduled_at)
  where status = 'Scheduled';

create table public.health_records (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null unique references public.profiles(id) on delete cascade,
  chronic_conditions text[] not null default '{}',
  allergies text[] not null default '{}',
  vitals jsonb not null default '{}'::jsonb,
  prescriptions jsonb not null default '[]'::jsonb,
  vaccinations jsonb not null default '[]'::jsonb,
  clinical_notes jsonb not null default '[]'::jsonb,
  primary_category text not null default 'General',
  assigned_staff_id uuid references public.profiles(id) on delete set null,
  status text not null default 'Active' check (status in ('Active', 'Archived', 'Pending')),
  last_visit_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index health_records_staff_status_idx on public.health_records(assigned_staff_id, status);
create index health_records_conditions_gin_idx on public.health_records using gin(chronic_conditions);

create table public.system_settings (
  id boolean primary key default true check (id),
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  official_role text not null check (char_length(official_role) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) between 7 and 30),
  locality text not null check (char_length(locality) between 3 and 200),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create index audit_logs_created_idx on public.audit_logs(created_at desc);
create index audit_logs_resource_idx on public.audit_logs(resource_type, resource_id, created_at desc);
create index audit_logs_actor_idx on public.audit_logs(actor_id, created_at desc);
create index contact_requests_status_idx on public.contact_requests(status, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger consultations_updated_at before update on public.consultations for each row execute function public.set_updated_at();
create trigger appointments_updated_at before update on public.appointments for each row execute function public.set_updated_at();
create trigger medicines_updated_at before update on public.medicines for each row execute function public.set_updated_at();
create trigger announcements_updated_at before update on public.announcements for each row execute function public.set_updated_at();
create trigger health_records_updated_at before update on public.health_records for each row execute function public.set_updated_at();

create or replace function public.protect_profile_privileges()
returns trigger language plpgsql set search_path = '' as $$
begin
  if auth.uid() is not null and
    (old.role is distinct from new.role or old.status is distinct from new.status or old.license_number is distinct from new.license_number or old.station is distinct from new.station) and
    coalesce((select role from public.profiles where id = auth.uid()), 'resident'::public.app_role) <> 'admin' then
    raise exception 'Only administrators may change privileged account fields';
  end if;
  return new;
end;
$$;
create trigger protect_profile_privileges before update on public.profiles
for each row execute function public.protect_profile_privileges();

create or replace function public.protect_resident_appointment_updates()
returns trigger language plpgsql set search_path = '' as $$
begin
  if coalesce((select role from public.profiles where id = auth.uid()), 'resident'::public.app_role) = 'resident' and (
    old.resident_id is distinct from new.resident_id or old.assigned_staff_id is distinct from new.assigned_staff_id or
    old.category is distinct from new.category or old.title is distinct from new.title or old.starts_at is distinct from new.starts_at or
    old.ends_at is distinct from new.ends_at or old.location is distinct from new.location or old.notes is distinct from new.notes or
    new.status <> 'cancelled'
  ) then
    raise exception 'Residents may only cancel their own appointments';
  end if;
  return new;
end;
$$;
create trigger protect_resident_appointment_updates before update on public.appointments
for each row execute function public.protect_resident_appointment_updates();

create or replace function public.sanitize_resident_appointment_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  if coalesce((select role from public.profiles where id = auth.uid()), 'resident'::public.app_role) = 'resident' then
    new.resident_id = auth.uid();
    new.assigned_staff_id = null;
    new.status = 'pending';
  end if;
  return new;
end;
$$;
create trigger sanitize_resident_appointment_insert before insert on public.appointments
for each row execute function public.sanitize_resident_appointment_insert();

create or replace function public.sanitize_resident_consultation_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  if coalesce((select role from public.profiles where id = auth.uid()), 'resident'::public.app_role) = 'resident' then
    new.resident_id = auth.uid();
    new.assigned_staff_id = null;
    new.status = 'waiting';
  end if;
  return new;
end;
$$;
create trigger sanitize_resident_consultation_insert before insert on public.consultations
for each row execute function public.sanitize_resident_consultation_insert();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
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

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.current_role()
returns public.app_role language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_role() in ('bhw', 'nurse', 'doctor', 'admin'), false)
$$;

create or replace function public.has_permission(permission text)
returns boolean language sql stable security definer set search_path = '' as $$
  select case public.current_role()
    when 'admin' then true
    when 'doctor' then permission = any(array[
      'consultations.read', 'consultations.manage', 'appointments.read', 'appointments.manage',
      'records.read', 'records.manage', 'medicines.read', 'medicines.manage',
      'announcements.read'
    ])
    when 'nurse' then permission = any(array[
      'consultations.read', 'consultations.manage', 'appointments.read', 'appointments.manage',
      'records.read', 'records.manage', 'medicines.read', 'medicines.manage',
      'announcements.read', 'announcements.manage'
    ])
    when 'bhw' then permission = any(array[
      'consultations.read', 'consultations.manage', 'appointments.read', 'appointments.manage',
      'records.read', 'medicines.read', 'announcements.read', 'announcements.manage'
    ])
    when 'resident' then permission = any(array['medicines.read', 'announcements.read'])
    else false
  end
$$;

alter table public.profiles enable row level security;
alter table public.consultations enable row level security;
alter table public.consultation_messages enable row level security;
alter table public.appointments enable row level security;
alter table public.medicines enable row level security;
alter table public.announcements enable row level security;
alter table public.health_records enable row level security;
alter table public.system_settings enable row level security;
alter table public.audit_logs enable row level security;
alter table public.contact_requests enable row level security;

create policy profiles_select on public.profiles for select to authenticated
using (id = auth.uid() or public.is_staff());
create policy profiles_update_own on public.profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid() and role = public.current_role());
create policy profiles_staff_update on public.profiles for update to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy consultations_select on public.consultations for select to authenticated
using (resident_id = auth.uid() or public.has_permission('consultations.read'));
create policy consultations_insert on public.consultations for insert to authenticated
with check (resident_id = auth.uid() or public.has_permission('consultations.manage'));
create policy consultations_update on public.consultations for update to authenticated
using (public.has_permission('consultations.manage')) with check (public.has_permission('consultations.manage'));

create policy messages_select on public.consultation_messages for select to authenticated
using (exists (select 1 from public.consultations c where c.id = consultation_id and (c.resident_id = auth.uid() or public.has_permission('consultations.read'))));
create policy messages_insert on public.consultation_messages for insert to authenticated
with check (sender_id = auth.uid() and exists (select 1 from public.consultations c where c.id = consultation_id and (c.resident_id = auth.uid() or public.has_permission('consultations.manage'))));
create policy messages_update_read on public.consultation_messages for update to authenticated
using (exists (select 1 from public.consultations c where c.id = consultation_id and (c.resident_id = auth.uid() or public.has_permission('consultations.manage'))));

create policy appointments_select on public.appointments for select to authenticated
using (resident_id = auth.uid() or public.has_permission('appointments.read'));
create policy appointments_insert on public.appointments for insert to authenticated
with check (resident_id = auth.uid() or public.has_permission('appointments.manage'));
create policy appointments_update on public.appointments for update to authenticated
using (resident_id = auth.uid() or public.has_permission('appointments.manage'))
with check (resident_id = auth.uid() or public.has_permission('appointments.manage'));

create policy medicines_read on public.medicines for select to authenticated using (is_active or public.has_permission('medicines.manage'));
create policy medicines_staff_write on public.medicines for all to authenticated
using (public.has_permission('medicines.manage')) with check (public.has_permission('medicines.manage'));

create policy announcements_read on public.announcements for select to authenticated
using ((status = 'Published' and coalesce(published_at, now()) <= now()) or public.has_permission('announcements.read'));
create policy announcements_staff_write on public.announcements for all to authenticated
using (public.has_permission('announcements.manage')) with check (public.has_permission('announcements.manage'));

create policy health_records_select on public.health_records for select to authenticated
using (resident_id = auth.uid() or public.has_permission('records.read'));
create policy health_records_staff_write on public.health_records for all to authenticated
using (public.has_permission('records.manage')) with check (public.has_permission('records.manage'));

create policy settings_staff_read on public.system_settings for select to authenticated using (public.current_role() = 'admin');
create policy settings_admin_write on public.system_settings for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy audit_staff_read on public.audit_logs for select to authenticated using (public.is_staff());
create policy audit_staff_insert on public.audit_logs for insert to authenticated
with check (public.is_staff() and actor_id = auth.uid());
create policy contact_public_insert on public.contact_requests for insert to anon, authenticated with check (status = 'new');
create policy contact_staff_read on public.contact_requests for select to authenticated using (public.current_role() = 'admin');
create policy contact_staff_update on public.contact_requests for update to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('consultation-attachments', 'consultation-attachments', false, 10485760,
  array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy attachments_read on storage.objects for select to authenticated
using (bucket_id = 'consultation-attachments' and exists (
  select 1 from public.consultations c
  where c.id::text = (storage.foldername(name))[1]
    and (c.resident_id = auth.uid() or public.has_permission('consultations.read'))
));
create policy attachments_insert on storage.objects for insert to authenticated
with check (bucket_id = 'consultation-attachments'
  and (storage.foldername(name))[2] = auth.uid()::text
  and exists (
    select 1 from public.consultations c
    where c.id::text = (storage.foldername(name))[1]
      and (c.resident_id = auth.uid() or public.has_permission('consultations.manage'))
  ));
create policy attachments_delete on storage.objects for delete to authenticated
using (bucket_id = 'consultation-attachments' and (storage.foldername(name))[2] = auth.uid()::text);

alter publication supabase_realtime add table public.consultations;
alter publication supabase_realtime add table public.consultation_messages;
alter publication supabase_realtime add table public.appointments;
alter publication supabase_realtime add table public.announcements;
alter publication supabase_realtime add table public.medicines;
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.health_records;
