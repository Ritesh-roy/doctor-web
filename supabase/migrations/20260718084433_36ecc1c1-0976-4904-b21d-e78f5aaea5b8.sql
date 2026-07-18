
DROP POLICY IF EXISTS "Anyone can create a valid booking" ON public.bookings;
CREATE POLICY "Anyone can create a valid booking" ON public.bookings
FOR INSERT
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND length(TRIM(BOTH FROM patient_name)) >= 2
  AND phone ~ '^\+?[0-9]{10,15}$'
  AND length(TRIM(BOTH FROM service)) >= 2
  AND preferred_date >= CURRENT_DATE
  AND length(TRIM(BOTH FROM preferred_time)) >= 2
);

DROP POLICY IF EXISTS "Anyone can create a valid order" ON public.orders;
CREATE POLICY "Anyone can create a valid order" ON public.orders
FOR INSERT
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND length(TRIM(BOTH FROM customer_name)) >= 2
  AND phone ~ '^\+?[0-9]{10,15}$'
  AND jsonb_array_length(items) > 0
  AND total_amount >= 0
  AND payment_method = ANY (ARRAY['cod','razorpay'])
  AND (preferred_date IS NULL OR preferred_date >= CURRENT_DATE)
);
