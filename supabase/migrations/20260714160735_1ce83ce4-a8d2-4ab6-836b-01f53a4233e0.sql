DROP POLICY IF EXISTS "Anyone can create a valid order" ON public.orders;

CREATE POLICY "Anyone can create a valid order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(customer_name)) >= 2
  AND phone ~ '^\+?[0-9]{10,15}$'
  AND jsonb_array_length(items) > 0
  AND total_amount >= 0
  AND payment_method IN ('cod', 'razorpay')
  AND (preferred_date IS NULL OR preferred_date >= CURRENT_DATE)
);