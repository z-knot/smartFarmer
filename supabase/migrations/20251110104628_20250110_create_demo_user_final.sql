
-- Create demo user for testing
-- Email: demo@smartfarm.com
-- Password: Demo12345!

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Create auth user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@smartfarm.com',
    crypt('Demo12345!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    now(),
    now()
  ) RETURNING id INTO v_user_id;

  -- If user was created, add to public.users
  IF v_user_id IS NOT NULL THEN
    INSERT INTO public.users (id, full_name, role, created_at, updated_at)
    VALUES (v_user_id, 'Demo Farmer', 'farmer', now(), now());
  END IF;
END $$;
