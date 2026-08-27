-- Remove product fields that are no longer consumed by the catalogue.

ALTER TABLE products DROP COLUMN specifications;
ALTER TABLE products DROP COLUMN faqs;
ALTER TABLE products DROP COLUMN commercial;