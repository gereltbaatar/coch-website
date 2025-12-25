-- Add discount_price column to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS discount_price INTEGER DEFAULT NULL;

-- Add comment for the column
COMMENT ON COLUMN products.discount_price IS 'Хямдралтай үнэ (optional)';

-- Example: Update a product with discount price
-- UPDATE products SET discount_price = 8000 WHERE id = 'your-product-id';

-- Example: Query products with discount
-- SELECT name, price, discount_price,
--        CASE WHEN discount_price IS NOT NULL
--             THEN ROUND((1 - discount_price::decimal / price) * 100)
--             ELSE 0
--        END as discount_percent
-- FROM products
-- WHERE discount_price IS NOT NULL;
