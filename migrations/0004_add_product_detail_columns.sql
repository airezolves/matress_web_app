-- Add optional product-detail tab content scraped from product pages.

ALTER TABLE products ADD COLUMN specifications TEXT;
ALTER TABLE products ADD COLUMN care_instructions TEXT;
ALTER TABLE products ADD COLUMN delivery_information TEXT;
ALTER TABLE products ADD COLUMN return_policy TEXT;
