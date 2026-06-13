-- Pharmacy contact settings (readable by storefront/admin)
CREATE TABLE IF NOT EXISTS public.pharmacy_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.pharmacy_settings (key, value) VALUES
  ('phone', '0554873890'),
  ('email', 'care@ampahpharmacy.com'),
  ('address', '14 Independence Avenue, Accra, Ghana')
ON CONFLICT (key) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = NOW();

ALTER TABLE public.pharmacy_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read pharmacy settings" ON public.pharmacy_settings;
CREATE POLICY "Public read pharmacy settings"
  ON public.pharmacy_settings FOR SELECT
  USING (true);

GRANT SELECT ON public.pharmacy_settings TO anon, authenticated;
