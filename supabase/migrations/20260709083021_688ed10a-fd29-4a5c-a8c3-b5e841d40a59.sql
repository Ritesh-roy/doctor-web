DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;
CREATE POLICY "Anyone can create a valid booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(patient_name)) >= 2
  AND phone ~ '^\+?[0-9]{10,15}$'
  AND length(trim(service)) >= 2
  AND preferred_date >= CURRENT_DATE
  AND length(trim(preferred_time)) >= 2
);

DROP POLICY IF EXISTS "Anyone can create an order" ON public.orders;
CREATE POLICY "Anyone can create a valid order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(customer_name)) >= 2
  AND phone ~ '^\+?[0-9]{10,15}$'
  AND jsonb_array_length(items) > 0
  AND total_amount >= 0
  AND payment_method IN ('cod', 'upi', 'card')
  AND (preferred_date IS NULL OR preferred_date >= CURRENT_DATE)
);

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;