DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;

CREATE POLICY "Anyone can submit a valid enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 2000
);