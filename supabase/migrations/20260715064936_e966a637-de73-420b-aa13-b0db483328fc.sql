
ALTER TABLE public.bookings ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE public.orders   ALTER COLUMN phone DROP NOT NULL;

UPDATE public.profiles
SET phone = CASE
  WHEN phone IS NULL THEN NULL
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^91[6-9][0-9]{9}$' THEN substring(regexp_replace(phone, '\D', '', 'g') from 3)
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^[6-9][0-9]{9}$' THEN regexp_replace(phone, '\D', '', 'g')
  ELSE NULL
END;

UPDATE public.bookings
SET phone = CASE
  WHEN phone IS NULL THEN NULL
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^91[6-9][0-9]{9}$' THEN substring(regexp_replace(phone, '\D', '', 'g') from 3)
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^[6-9][0-9]{9}$' THEN regexp_replace(phone, '\D', '', 'g')
  ELSE NULL
END;

UPDATE public.orders
SET phone = CASE
  WHEN phone IS NULL THEN NULL
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^91[6-9][0-9]{9}$' THEN substring(regexp_replace(phone, '\D', '', 'g') from 3)
  WHEN regexp_replace(phone, '\D', '', 'g') ~ '^[6-9][0-9]{9}$' THEN regexp_replace(phone, '\D', '', 'g')
  ELSE NULL
END;

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_phone_format_chk;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_phone_format_chk;
ALTER TABLE public.orders   DROP CONSTRAINT IF EXISTS orders_phone_format_chk;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_phone_format_chk
  CHECK (phone IS NULL OR phone ~ '^[6-9][0-9]{9}$');
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_phone_format_chk
  CHECK (phone IS NULL OR phone ~ '^[6-9][0-9]{9}$');
ALTER TABLE public.orders
  ADD CONSTRAINT orders_phone_format_chk
  CHECK (phone IS NULL OR phone ~ '^[6-9][0-9]{9}$');

CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_unique_idx
  ON public.profiles (phone)
  WHERE phone IS NOT NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  raw_phone text;
  normalized text;
BEGIN
  raw_phone := COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone);
  normalized := regexp_replace(COALESCE(raw_phone, ''), '\D', '', 'g');
  IF normalized ~ '^91[6-9][0-9]{9}$' THEN
    normalized := substring(normalized from 3);
  END IF;
  IF normalized !~ '^[6-9][0-9]{9}$' THEN
    normalized := NULL;
  END IF;

  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    normalized
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$function$;
