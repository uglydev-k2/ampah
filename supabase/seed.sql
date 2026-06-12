-- Seed data for Ampah Pharmacy
-- Run after 001_initial_schema.sql

-- Categories (IDs auto-generated as UUIDs)
INSERT INTO categories (name, slug, description) VALUES
  ('Pain Relief', 'pain-relief', 'Effective pain management solutions'),
  ('Vitamins and Supplements', 'vitamins-supplements', 'Daily wellness essentials'),
  ('Cold and Flu', 'cold-flu', 'Relief for cold and flu symptoms'),
  ('Skin Care', 'skin-care', 'Dermatologist-recommended products'),
  ('Baby Care', 'baby-care', 'Gentle care for your little ones'),
  ('Diabetes Care', 'diabetes-care', 'Diabetes management products'),
  ('Heart Health', 'heart-health', 'Cardiovascular wellness'),
  ('Personal Care', 'personal-care', 'Everyday hygiene essentials'),
  ('Medical Equipment', 'medical-equipment', 'Professional medical devices'),
  ('First Aid', 'first-aid', 'Emergency care essentials')
ON CONFLICT (slug) DO NOTHING;

-- Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
  ('WELCOME10', '10% off your first order', 'percentage', 10, 25, 1000, true),
  ('HEALTH5', '$5 off orders over $50', 'fixed', 5, 50, 500, true),
  ('FREESHIP', 'Free shipping on any order', 'fixed', 5.99, 0, 200, true)
ON CONFLICT (code) DO NOTHING;

-- Products (category_id resolved by slug)
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Ibuprofen 200mg', 'ibuprofen-200mg',
  'Fast-acting pain relief for headaches, muscle aches, and fever.',
  'Fast-acting pain relief tablets', 8.99, 12.99,
  c.id, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  'Ibuprofen 200mg', 'Take 1-2 tablets every 4-6 hours.', 150, true, 4.8, 234
FROM categories c WHERE c.slug = 'pain-relief'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Vitamin D3 5000 IU', 'vitamin-d3-5000',
  'High-potency Vitamin D3 supplement for bone health.',
  'High-potency bone health supplement', 14.99, NULL,
  c.id, 'https://images.unsplash.com/photo-1550572017-edd951aa8f71?w=400',
  'Vitamin D3 5000 IU', 'Take 1 softgel daily.', 200, true, 4.9, 412
FROM categories c WHERE c.slug = 'vitamins-supplements'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Cold & Flu Relief', 'cold-flu-relief',
  'Multi-symptom relief for cold and flu.',
  'Multi-symptom cold relief', 11.49, 15.99,
  c.id, 'https://images.unsplash.com/photo-1587854692152-cad860a0e7a?w=400',
  'Acetaminophen, Dextromethorphan', 'Take 2 caplets every 4 hours.', 85, true, 4.5, 178
FROM categories c WHERE c.slug = 'cold-flu'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Hydrating Face Cream', 'hydrating-face-cream',
  'Dermatologist-tested moisturizing cream with hyaluronic acid.',
  'Hyaluronic acid moisturizer', 22.99, 29.99,
  c.id, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
  'Hyaluronic Acid, Glycerin, Ceramides', 'Apply to clean face morning and evening.', 60, true, 4.7, 89
FROM categories c WHERE c.slug = 'skin-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Baby Gentle Wash', 'baby-gentle-wash',
  'Tear-free, hypoallergenic body wash for sensitive baby skin.',
  'Tear-free baby body wash', 9.99, NULL,
  c.id, 'https://images.unsplash.com/photo-1515488042361-ee00e3ddd4e4?w=400',
  'Water, Cocamidopropyl Betaine, Glycerin', 'Apply to wet skin, lather gently, rinse.', 120, false, 4.9, 156
FROM categories c WHERE c.slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Blood Glucose Monitor', 'blood-glucose-monitor',
  'Accurate blood glucose monitoring with fast 5-second results.',
  'Fast 5-second glucose monitor', 34.99, 44.99,
  c.id, 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
  NULL, 'Insert test strip, apply blood sample, read result.', 45, false, 4.6, 67
FROM categories c WHERE c.slug = 'diabetes-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Omega-3 Fish Oil', 'omega-3-fish-oil',
  'Premium fish oil for heart and brain health.',
  'Heart & brain health supplement', 19.99, 24.99,
  c.id, 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
  'Fish Oil, EPA, DHA', 'Take 2 softgels daily.', 175, true, 4.8, 298
FROM categories c WHERE c.slug = 'heart-health'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Antibacterial Hand Sanitizer', 'hand-sanitizer',
  'Kills 99.9% of germs with moisturizing aloe vera formula.',
  '99.9% germ-killing sanitizer', 5.99, NULL,
  c.id, 'https://images.unsplash.com/photo-1584483766114-2cea1facdf57?w=400',
  'Ethyl Alcohol 70%, Aloe Vera', 'Apply to hands and rub until dry.', 300, false, 4.4, 521
FROM categories c WHERE c.slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Digital Thermometer', 'digital-thermometer',
  'Fast and accurate digital thermometer with fever alert.',
  'Fast-read digital thermometer', 12.99, 16.99,
  c.id, 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400',
  NULL, 'Place under tongue, wait for beep.', 90, false, 4.5, 143
FROM categories c WHERE c.slug = 'medical-equipment'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'First Aid Kit Premium', 'first-aid-kit-premium',
  'Comprehensive 100-piece first aid kit for home, office, or travel.',
  '100-piece comprehensive kit', 29.99, 39.99,
  c.id, 'https://images.unsplash.com/photo-1603398937418-0a4e1550a67a?w=400',
  NULL, 'Use appropriate items for minor injuries.', 55, true, 4.7, 87
FROM categories c WHERE c.slug = 'first-aid'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Acetaminophen 500mg', 'acetaminophen-500mg',
  'Extra strength pain reliever and fever reducer.',
  'Extra strength pain reliever', 7.49, NULL,
  c.id, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
  'Acetaminophen 500mg', 'Take 1-2 caplets every 6 hours.', 200, false, 4.6, 189
FROM categories c WHERE c.slug = 'pain-relief'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, image_url, ingredients, usage_instructions, stock, is_featured, rating, review_count)
SELECT
  'Multivitamin Daily', 'multivitamin-daily',
  'Complete daily multivitamin with 23 essential vitamins and minerals.',
  '23 essential vitamins & minerals', 16.99, 21.99,
  c.id, 'https://images.unsplash.com/photo-1526253033463-99c25a0f7d6c?w=400',
  'Vitamin A, C, D, E, B-Complex, Zinc', 'Take 1 tablet daily with food.', 180, false, 4.7, 345
FROM categories c WHERE c.slug = 'vitamins-supplements'
ON CONFLICT (slug) DO NOTHING;
